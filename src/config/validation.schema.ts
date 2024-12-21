// src/config/validation.schema.ts

import * as Joi from 'joi';

export const validationSchema = Joi.object({
  /**
   * Discord Config
   */
  DISCORD_TOKEN: Joi.string().required(),
  DISCORD_CHANNEL_ID: Joi.string().required(),

  /**
   * Hoyoverse Config
   */
  HOYO_LTOKEN_V2: Joi.string().required(),
  HOYO_LTUID_V2: Joi.string().required(),
});
