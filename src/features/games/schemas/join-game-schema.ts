import { z } from 'zod';

export const joinGameSchema = z.object({
  gameId: z.string().trim().nonempty(),
  userId: z.string().trim().nonempty(),
});

export type joinGameType = z.infer<typeof joinGameSchema>;
