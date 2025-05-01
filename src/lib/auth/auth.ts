import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '../prisma';
import authConfig from './auth.config';
import { getUserById } from '@/data/user-data';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ token, session }) {
      const tokenSub = token.sub;

      if (!tokenSub) return session;

      const existingUser = await getUserById(tokenSub);

      if (!existingUser) return session;

      const { email, username, isTwoFactorEnabled, id } =
        existingUser;

      session.user.email = email;
      session.user.id = id;
      session.user.username = username;

      session.user.isTwoFactorEnabled = isTwoFactorEnabled;

      return session;
    },
  },
  ...authConfig,
});
