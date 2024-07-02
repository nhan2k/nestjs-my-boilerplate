import { Module } from '@nestjs/common';
import { TaskSchedulingService } from './task-scheduling.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TaskSchedulingService],
})
export class TaskSchedulingModule {}
