'use server';

import { getUserByEmail, getUserByUsername } from '@/data/user-data';
import { signupSchema, signupType } from '../schemas/signup-schema';
import { hashPassword } from '@/lib/bcrypt';
import { prisma } from '@/lib/prisma';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const signupAction = async (data: signupType) => {
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: 'Invalid form',
    };
  }

  const { email, username, password } = validatedFields.data;

  const isEmailTaken = await getUserByEmail(email);

  if (isEmailTaken) {
    return {
      error: 'This email is already taken',
    };
  }

  const isUsernameTaken = await getUserByUsername(username);

  if (isUsernameTaken) {
    return {
      error: 'This username is already taken',
    };
  }

  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(email, verificationToken.token);

    return {
      message: 'A confirmation email has been sent',
    };
  } catch {
    throw new Error('An error has occured');
  }
};
