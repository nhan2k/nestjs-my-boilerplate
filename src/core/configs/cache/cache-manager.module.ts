import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';

const RedisFactoryModule = CacheModule.registerAsync({
  imports: [ConfigModule],
  isGlobal: true,
  useFactory: async (configService: ConfigService) => ({
    ttl: configService.get('CACHE_TTL'),
    store: redisStore,
    host: configService.get('CACHE_HOST'),
    port: configService.get('CACHE_PORT'),
  }),
  inject: [ConfigService],
});

@Module({
  imports: [RedisFactoryModule],
  providers: [CacheService],
})
export class CacheManagerModule {}
