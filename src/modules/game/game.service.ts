import { Injectable } from '@nestjs/common';
import { DiscordService } from '../discord/discord.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class GameService {
  constructor(private readonly discordService: DiscordService) {
    console.log('GameService instantiated');
  }

  @Cron('*/10 * * * * *')
  public async signInGenshinImpact() {
    await this.discordService.sendMessage('test');
  }
}
