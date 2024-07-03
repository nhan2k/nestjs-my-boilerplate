import { Global, Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CoreModule } from 'src/core/core.module';
import { CacheService } from 'src/core/configs/cache/cache.service';
import { CaslAbilityFactory } from 'src/shared/casl/casl-ability.factory';

@Global()
@Module({
  imports: [CoreModule],
  controllers: [CatsController],
  providers: [CatsService, CacheService, CaslAbilityFactory],
})
export class CatsModule {}
