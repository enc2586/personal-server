import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { GameModule } from './modules/game/game.module';

// Config Files
import discordConfig from './config/discord.config';
import hoyoverseConfig from './config/game.config';

// Config Validation
import { validationSchema } from './config/validation.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [discordConfig, hoyoverseConfig],
      validationSchema,
    }),
    ScheduleModule.forRoot(),
    HttpModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
