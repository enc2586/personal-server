import { registerAs } from '@nestjs/config';

export default registerAs('game', () => ({
  hoyoLtoken: process.env.HOYO_LTOKEN_V2,
  hoyoLtuid: process.env.HOYO_LTUID_V2,
}));
