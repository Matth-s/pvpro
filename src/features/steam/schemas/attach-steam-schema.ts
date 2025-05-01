import { z } from 'zod';

export const attachSteamSchema = z.object({
  'openid.ns': z.string().nonempty('openid.ns is required'),
  'openid.mode': z.string().nonempty('openid.mode is required'),
  'openid.claimed_id': z
    .string()
    .url('openid.claimed_id must be a valid URL'),
  'openid.identity': z
    .string()
    .url('openid.identity must be a valid URL'),
  'openid.return_to': z
    .string()
    .url('openid.return_to must be a valid URL'),
  'openid.response_nonce': z
    .string()
    .nonempty('openid.response_nonce is required'),
  'openid.assoc_handle': z
    .string()
    .nonempty('openid.assoc_handle is required'),
  'openid.signed': z.string().nonempty('openid.signed is required'),
  'openid.sig': z.string().nonempty('openid.sig is required'),
  'openid.op_endpoint': z.string().nonempty('openid.op_endpoint'),
});
