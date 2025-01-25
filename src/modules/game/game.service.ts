import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DiscordService } from '../discord/discord.service';
import { Cron } from '@nestjs/schedule';
import { HoyoGame } from './types/hoyoverse.types';
import { games, hoyoGameDetails } from './game.constants';
import gameConfig from 'src/config/game.config';
import { ConfigType } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GameService {
  constructor(
    @Inject(gameConfig.KEY)
    private config: ConfigType<typeof gameConfig>,
    private readonly httpService: HttpService,
    private readonly discordService: DiscordService,
  ) {
    console.log('GameService instantiated');
  }

  @Cron('10 1 * * *')
  private async signInAllHoyoGames() {
    for (const game of games) {
      const { name } = hoyoGameDetails[game];
      const { ok, status, response } = await this.signInHoyoGame(game);

      const prefix = `[${name}]`;

      if (ok) {
        switch (status) {
          case 'success':
            this.discordService.sendMessage(`${prefix} ✅출석체크 성공`);
            break;
          case 'duplicate':
            this.discordService.sendMessage(`${prefix} ⚠️이미 출석체크됨`);
            break;
          default:
            this.discordService.sendMessage(
              `${prefix} ❓출석체크:${status} (msg: '${response}')`,
            );
            break;
        }
      } else {
        this.discordService.sendMessage(`${prefix} ❌출석체크 오류`);
      }
    }
  }

  public async signInHoyoGame(game: HoyoGame) {
    const { url, headers, responses } = hoyoGameDetails[game];
    const { hoyoLtoken, hoyoLtuid } = this.config;
    const tokenString = `ltoken_v2=${hoyoLtoken}; ltuid_v2=${hoyoLtuid}`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          url,
          {},
          {
            headers: {
              Cookie: tokenString,
              Referer: 'https://act.hoyolab.com/',
              Origin: 'https://act.hoyolab.com',
              ...headers,
            },
          },
        ),
      );

      const status =
        Object.entries(responses).find(
          ([, string]) => response.data.message === string,
        )?.[0] ?? 'unknown';

      return {
        ok: true,
        status,
        response: response.data.message,
      };
    } catch (error) {
      console.error('Error fetching data:', error);

      return {
        ok: false,
      };
    }
  }
}
