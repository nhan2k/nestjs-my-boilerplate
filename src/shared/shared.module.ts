import { Module } from '@nestjs/common';
import { QueuesModule } from './queues/queues.module';
import { EventsModule } from './events/events.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [QueuesModule, EventsModule, CaslModule],
  exports: [QueuesModule, EventsModule, CaslModule],
})
export class SharedModule {}
