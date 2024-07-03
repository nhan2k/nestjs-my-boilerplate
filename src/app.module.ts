import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CaslAbilityFactory } from './shared/casl/casl-ability.factory';
import { CsrfService } from './shared/csrf/csrf.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CsrfInterceptor } from './shared/interceptors/csrf.interceptor';
import { CsrfMiddleware } from './shared/middlewares/csrf.middleware';
import { multerOption } from './core/configs/multer/multer.config';
import { serveStaticOption } from './core/configs/serve-static/serve-static.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { throttleOption } from './core/configs/throttle/throttle.config';

@Module({
  imports: [
    CoreModule,
    FeaturesModule,
    SharedModule,
    MulterModule.registerAsync(multerOption),
    ServeStaticModule.forRoot(serveStaticOption),
    ThrottlerModule.forRootAsync(throttleOption),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CaslAbilityFactory,
    CsrfService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CsrfInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, CsrfMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
