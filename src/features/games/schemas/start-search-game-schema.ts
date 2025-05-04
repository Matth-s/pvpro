import { GameMode } from '@prisma/client';
import { z } from 'zod';

export const startSearchGameSchema = z.object({
  mode: z.enum([
    GameMode.p_1v1,
    GameMode.p_2v2,
    GameMode.p_3v3,
    GameMode.p_5v5,
  ]),
  maps: z.array(z.string()).min(1, {
    message: 'You must choose map',
  }),
});

export type startSearchGameType = z.infer<
  typeof startSearchGameSchema
>;
