'use server';

import { getCurrentUser } from '@/helpers/user-helper';
import { redirect } from 'next/navigation';
import { attachSteamSchema } from '../schemas/attach-steam-schema';
import { SteamDataResponseInterface } from '../types/steam-types';
import { prisma } from '@/lib/prisma';

export const attachSteamAction = async (
  params: Record<string, string>
) => {
  const user = await getCurrentUser();

  if (!user) redirect('/auth/sign-in');

  const validateFields = attachSteamSchema.safeParse(params);

  if (!validateFields.success) {
    return {
      error: 'Invalid params',
    };
  }

  const { data } = validateFields;

  try {
    const validationParams = {
      ...data,
      'openid.mode': 'check_authentication',
    };

    const body = new URLSearchParams(
      validationParams as Record<string, string>
    ).toString();

    const response = await fetch(
      'https://steamcommunity.com/openid/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      }
    );

    const responseBody = await response.text();

    if (responseBody.includes('is_valid:true')) {
      const steamId = params['openid.claimed_id']?.split('/').pop();

      if (steamId) {
        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.API_KEY_STEAM}&steamids=${steamId}`;

        const response = await fetch(url);
        const data: SteamDataResponseInterface =
          await response.json();

        if (
          data.response.players &&
          data.response.players.length > 0
        ) {
          const player = data.response.players[0];

          const userHasSteamAlreadySync =
            await prisma.steam.findFirst({
              where: {
                userId: user.id,
              },
            });

          if (userHasSteamAlreadySync) {
            return {
              success: 'Your steam is already sync',
            };
          }

          await prisma.steam.create({
            data: {
              userId: user.id,
              name: player.personaname,
              profileUrl: player.profileurl,
              communityBanned:
                player.communityvisibilitystate === 3 ? false : true,
              steamUid: player.steamid,
              avatar: player.avatar,
            },
          });

          return {
            success: 'Your steam is now sync',
          };
        }
      } else {
        return {
          error: 'Steam ID extraction failed',
        };
      }
    } else {
      return { error: 'Authentication failed' };
    }
  } catch (err) {
    console.log(err);
    throw new Error('Internal server error');
  }
};
