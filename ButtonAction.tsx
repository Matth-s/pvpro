'use server';

import { sendRconCommand } from '@/lib/rcon';

export const ButtonAction = async (gameId: string) => {
  // Définit la difficulté des bots à Hard (2)
  await sendRconCommand('bot_difficulty 2');

  // Ajouter 30 bots en CT
  for (let i = 0; i < 30; i++) {
    const rconResponse = await sendRconCommand('bot_add_ct');
    console.log(`Bot ${i + 1} ajouté:`, rconResponse);
  }
};
