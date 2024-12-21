import { Module } from '@nestjs/common';
import { DiscordModule } from '../discord/discord.module';
import { GameService } from './game.service';

@Module({
  imports: [DiscordModule],
  providers: [GameService],
})
export class GameModule {}
