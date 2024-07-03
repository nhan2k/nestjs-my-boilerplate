import { winstonConfig } from './logger';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => ({
        ...winstonConfig,
      }),
      inject: [],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class WinstonLoggerModule {}
