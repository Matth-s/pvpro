import { redirect } from 'next/navigation';

export const redirectSteamAuth = (): void => {
  const loginUrlParams = {
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': `${process.env.NEXT_PUBLIC_BASE_URL}/settings/steam/callback`,
    'openid.realm': `${location.protocol}//${location.host}`,
    'openid.identity':
      'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id':
      'http://specs.openid.net/auth/2.0/identifier_select',
  };

  const steamLoginUrl =
    'https://steamcommunity.com/openid/login?' +
    new URLSearchParams(loginUrlParams).toString();

  redirect(steamLoginUrl);
};
