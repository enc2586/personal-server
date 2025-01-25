import { Module } from '@nestjs/common';
import { DiscordModule } from '../discord/discord.module';
import { GameService } from './game.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DiscordModule, HttpModule],
  providers: [GameService],
})
export class GameModule {}
