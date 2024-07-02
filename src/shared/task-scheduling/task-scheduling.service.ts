import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronCommand, CronJob } from 'cron';

@Injectable()
export class TaskSchedulingService {
  private readonly logger = new Logger(TaskSchedulingService.name);
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  addCronJob(
    name: string,
    cronTime: string | Date,
    onTick: CronCommand<null, false>,
    onComplete?: null | undefined,
    start?: boolean | null | undefined,
    timeZone?: string | undefined,
    context?: null | undefined,
    runOnInit?: boolean | undefined,
    utcOffset?: null | undefined,
    unrefTimeout?: boolean | undefined,
  ): void {
    const job = new CronJob(
      cronTime,
      onTick,
      onComplete,
      start,
      timeZone,
      context,
      runOnInit,
      utcOffset,
      unrefTimeout,
    );

    this.schedulerRegistry.addCronJob(name, job);

    this.logger.warn(`job ${name} added for ${cronTime}!`);
  }

  deleteCron(name: string): void {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  getCrons(): Map<string, CronJob<null, null>> {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next: Date | string;
      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
    return jobs;
  }

  getCron(name: string): CronJob<null, null> {
    const job = this.schedulerRegistry.getCronJob(name);
    return job;
  }
}
