export type HoyoGame = 'genshin' | 'hkrpg' | 'zzz';

export type HoyoGameDetail = {
  name: string;
  url: string;
  headers: Record<string, string>;
  responses: {
    success: string;
    duplicate: string;
    [state: string]: string;
  };
};
