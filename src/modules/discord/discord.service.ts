import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import discordConfig from 'src/config/discord.config';

@Injectable()
export class DiscordService {
  private readonly client: Client;
  private readonly channelId: string;
  private readonly logger = new Logger(DiscordService.name);

  constructor(
    @Inject(discordConfig.KEY)
    private config: ConfigType<typeof discordConfig>,
  ) {
    const token = config.token;
    this.channelId = config.channelId;

    this.client = new Client({
      intents: [GatewayIntentBits.Guilds],
    });

    this.client.login(token).then(
      () => this.logger.log('Discord client logged in successfully'),
      (err) => this.logger.error('Error logging in to Discord:', err),
    );
  }

  public async sendMessage(message: string) {
    try {
      const channel = this.client.channels.cache.get(this.channelId);
      if (channel && channel.isTextBased()) {
        const textChannel = channel as TextChannel;
        await textChannel.send(message);
        this.logger.log(`Sent message to channel ${this.channelId}`);
      } else {
        this.logger.warn(
          `Channel with ID ${this.channelId} is invalid or not a text-based channel.`,
        );
      }
    } catch (err) {
      this.logger.error('Failed to send Discord message:', err);
    }
  }
}
