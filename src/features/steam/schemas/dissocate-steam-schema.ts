import { z } from 'zod';

export const dissociateSteamSchema = z
  .object({
    steamId: z.string().nonempty(),
    confirm: z.string(),
  })
  .refine((data) => data.confirm === 'delete', {
    message: 'You must type "delete"',
    path: ['confirm'],
  });

export type dissociateSteamType = z.infer<
  typeof dissociateSteamSchema
>;
