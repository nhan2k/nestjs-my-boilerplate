import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { PoliciesGuard } from './policies.guard';

@Module({
  providers: [PoliciesGuard, CaslAbilityFactory],
})
export class GuardsModule {}
