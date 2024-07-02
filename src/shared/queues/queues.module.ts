import { Module } from '@nestjs/common';
import { AudioModule } from './audio/audio.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AudioModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('CACHE_HOST'),
          port: configService.get('CACHE_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AudioModule],
})
export class QueuesModule {}
