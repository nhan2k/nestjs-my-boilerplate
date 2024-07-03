import { Module } from '@nestjs/common';
import { CsrfService } from './csrf.service';

@Module({
  providers: [CsrfService]
})
export class CsrfModule {}
