import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskSchedulingService {
  private readonly logger = new Logger(TaskSchedulingService.name);

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_9PM)
  handleCron() {
    this.logger.debug('Called from MONDAY_TO_FRIDAY_AT_9PM');
  }
}
