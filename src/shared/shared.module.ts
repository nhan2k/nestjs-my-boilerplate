import { Module } from '@nestjs/common';
import { QueuesModule } from './queues/queues.module';
import { EventsModule } from './events/events.module';
import { CaslModule } from './casl/casl.module';
import { GuardsModule } from './guards/guards.module';
import { HttpModuleModule } from './http-module/http-module.module';
import { TaskSchedulingService } from './task-scheduling/task-scheduling.service';
import { EncryptionModule } from './encryption/encryption.module';
import { HashingModule } from './hashing/hashing.module';
import { CsrfModule } from './csrf/csrf.module';

@Module({
  imports: [
    QueuesModule,
    EventsModule,
    HttpModuleModule,
    CaslModule,
    GuardsModule,
    EncryptionModule,
    HashingModule,
    CsrfModule,
  ],
  providers: [TaskSchedulingService],
  exports: [HttpModuleModule, EncryptionModule, HashingModule],
})
export class SharedModule {}
