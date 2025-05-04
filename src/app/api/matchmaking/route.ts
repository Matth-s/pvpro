import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const apiKeyHeader = req.headers.get('x-api-key');

  if (apiKeyHeader !== process.env.API_KEY) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const allSearches = await prisma.searchGame.findMany({
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });

    for (let i = 0; i < allSearches.length; i++) {
      const current = allSearches[i];

      for (let j = i + 1; j < allSearches.length; j++) {
        const potential = allSearches[j];

        const sameMode = current.mode === potential.mode;
        const sharedMap = current.maps.some((m) =>
          potential.maps.includes(m)
        );
        const pointDiff =
          Math.abs(current.user.points - potential.user.points) <=
          100;

        if (sameMode && sharedMap && pointDiff) {
          await prisma.game.create({
            data: {
              mode: current.mode,
              map:
                current.maps.find((m) =>
                  potential.maps.includes(m)
                ) || 'default',
              players: {
                create: [
                  {
                    user: { connect: { id: current.userId } },
                    team: 'team1',
                  },
                  {
                    user: { connect: { id: potential.userId } },
                    team: 'team2',
                  },
                ],
              },
            },
          });

          await prisma.searchGame.deleteMany({
            where: {
              userId: { in: [current.userId, potential.userId] },
            },
          });

          return NextResponse.json(
            { message: 'Match found and created' },
            { status: 200 }
          );
        }
      }
    }

    return NextResponse.json(
      { message: 'No match found yet' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
