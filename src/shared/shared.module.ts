import { Module } from '@nestjs/common';
import { QueuesModule } from './queues/queues.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [QueuesModule, EventsModule],
  exports: [QueuesModule, EventsModule],
})
export class SharedModule {}
