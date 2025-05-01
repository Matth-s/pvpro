export interface SteamDataResponseInterface {
  response: {
    players: [
      {
        avatar: string;
        avatarfull: string;
        avatarhash: string;
        avatarmedium: string;
        commentpermission: number;
        communityvisibilitystate: number;
        lastlogoff: Date;
        personaname: string;
        personastate: number;
        personastateflags: number;
        primaryclanid: string;
        profilestate: number;
        profileurl: string;
        steamid: string;
        timecreated: Date;
      },
    ];
  };
}
