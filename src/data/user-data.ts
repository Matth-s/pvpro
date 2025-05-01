import { prisma } from '@/lib/prisma';

export const getUserByUsernameOrEmail = async (
  identifier: string
) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: identifier,
              mode: 'insensitive',
            },
          },
          {
            email: {
              equals: identifier,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return existingUser;
  } catch {
    throw new Error('An error has occurred');
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return existingUser;
  } catch {
    throw new Error('An error has occurred');
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    return existingUser;
  } catch {
    throw new Error('An error has occurred');
  }
};

export const getUserById = async (id: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return existingUser;
  } catch {
    throw new Error('An error has occurred');
  }
};
