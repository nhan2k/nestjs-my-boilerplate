import { Global, Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CacheManagerModule } from 'src/core/configs/cache/cache-manager.module';
import { CoreModule } from 'src/core/core.module';
import { CacheService } from 'src/core/configs/cache/cache.service';

@Global()
@Module({
  imports: [CoreModule],
  controllers: [CatsController],
  providers: [CatsService, CacheService],
})
export class CatsModule {}
