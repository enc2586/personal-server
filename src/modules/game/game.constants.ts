import { HoyoGame, HoyoGameDetail } from './types/hoyoverse.types';

export const games: HoyoGame[] = ['genshin', 'hkrpg', 'zzz'];

export const hoyoGameDetails: Record<HoyoGame, HoyoGameDetail> = {
  genshin: {
    name: '원신',
    url: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=ko-kr&act_id=e202102251931481',
    headers: {
      'x-rpc-signgame': 'genshin',
    },
    responses: {
      success: '',
      duplicate: '여행자, 이미 출석체크했어~',
    },
  },
  hkrpg: {
    name: '붕괴: 스타레일',
    url: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=ko-kr&act_id=e202303301540311',
    headers: {
      'x-rpc-signgame': 'hkrpg',
    },
    responses: {
      success: '',
      duplicate: '개척자님, 이미 출석 체크를 완료했습니다~',
    },
  },
  zzz: {
    name: '젠레스 존 제로',
    url: 'https://sg-act-nap-api.hoyolab.com/event/luna/zzz/os/sign?lang=ko-kr&act_id=e202406031448091',
    headers: {
      'x-rpc-signgame': 'zzz',
    },
    responses: {
      success: '',
      duplicate: '이미 출석하셨습니다',
    },
  },
};
