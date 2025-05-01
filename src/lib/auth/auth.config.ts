import { getUserByUsernameOrEmail } from '@/data/user-data';
import { loginSchema } from '@/features/auth/schemas/login-schema';
import { CredentialsSignin, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { comparePassword } from '../bcrypt';

export default {
  providers: [
    Credentials({
      credentials: {},
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new CredentialsSignin();
        }

        const { usernameOrEmail, password } = validatedFields.data;

        const existingUser =
          await getUserByUsernameOrEmail(usernameOrEmail);

        const correctPassword = await comparePassword(
          password,
          existingUser?.password ? existingUser.password : ''
        );

        if (!correctPassword || !existingUser) {
          throw new CredentialsSignin();
        }

        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
