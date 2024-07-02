import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configs/config/config.module';
import { DatabaseModule } from './configs/database/database.module';
import { CacheManagerModule } from './configs/cache/cache-manager.module';
import { TaskSchedulingModule } from './task-scheduling/task-scheduling.module';
import { WinstonLoggerModule } from './winston/winston.module';
import { HttpModuleModule } from './http-module/http-module.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    CacheManagerModule,
    TaskSchedulingModule,
    WinstonLoggerModule,
    HttpModuleModule,
  ],
  exports: [
    ConfigurationModule,
    DatabaseModule,
    CacheManagerModule,
    TaskSchedulingModule,
    WinstonLoggerModule,
    HttpModuleModule,
  ],
})
export class CoreModule {}
