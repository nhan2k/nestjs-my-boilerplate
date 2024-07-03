import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configs/config/config.module';
import { DatabaseModule } from './configs/database/database.module';
import { CacheManagerModule } from './configs/cache/cache-manager.module';
import { TaskSchedulingModule } from './task-scheduling/task-scheduling.module';
import { WinstonLoggerModule } from './winston/winston.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    CacheManagerModule,
    TaskSchedulingModule,
    WinstonLoggerModule,
  ],
})
export class CoreModule {}
