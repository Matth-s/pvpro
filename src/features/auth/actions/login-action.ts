'use server';

import { loginSchema, loginType } from '../schemas/login-schema';
import { signIn } from '@/lib/auth/auth';
import { getUserByUsernameOrEmail } from '@/data/user-data';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/lib/token';
import {
  sendTwoFactorEmail,
  sendVerificationEmail,
} from '@/lib/mail';
import { prisma } from '@/lib/prisma';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';

export const loginAction = async (
  data: loginType
): Promise<
  | {
      error: string;
      message?: undefined;
      twoFactor?: undefined;
    }
  | {
      message: string;
      error?: undefined;
      twoFactor?: undefined;
    }
  | {
      twoFactor: boolean;
      error?: undefined;
      message?: undefined;
    }
  | undefined
> => {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: 'Invalid form',
    };
  }

  const { usernameOrEmail, password, code } = validatedFields.data;

  const existingUser =
    await getUserByUsernameOrEmail(usernameOrEmail);

  if (!existingUser) {
    return {
      error: 'Invalid email/username or password',
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      message: 'A confirmation email has been sent',
    };
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );
      if (!twoFactorToken) {
        return {
          error: 'Invalid code',
        };
      }

      if (twoFactorToken.token !== code) {
        return {
          error: 'Invalid code',
        };
      }

      const hasExpired =
        new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return {
          error: 'Code has expired',
        };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation =
        await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(
        existingUser.email
      );

      await sendTwoFactorEmail(
        twoFactorToken.email,
        twoFactorToken.token
      );

      return {
        twoFactor: true,
      };
    }
  }

  try {
    await signIn('credentials', {
      usernameOrEmail,
      password,
      redirect: true,
      redirectTo: '/',
    });
  } catch (err) {
    if (err instanceof Error) {
      const { name } = err;

      switch (name) {
        case 'CredentialsSignin':
          throw new Error('Invalid email/username or password');
        case 'CallbackRouteError':
          throw err;
      }
    }

    throw err;
  }
};
