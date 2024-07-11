import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerAsyncOptions, seconds } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

export const throttleOption: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    throttlers: [
      {
        ttl:
          seconds(
            config.get<string>('THROTTLE_TTL_SHORT') as unknown as number,
          ) ?? seconds(1),
        limit:
          (config.get<string>('THROTTLE_LIMIT_SHORT') as unknown as number) ??
          3,
      },
    ],
    storage: new ThrottlerStorageRedisService(),
  }),
};
