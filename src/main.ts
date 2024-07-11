import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/exception-filters/all-exception.filter';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { GlobalPipe } from './shared/pipes/global.pipe';
import { GlobalGuard } from './shared/guards/global.guard';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { winstonConfig } from './core/winston/logger';
import { WinstonModule } from 'nest-winston';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
    bufferLogs: true,
    forceCloseConnections: true,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new GlobalPipe());
  app.useGlobalGuards(new GlobalGuard());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['*'],
  });

  app.use(cookieParser());
  app.use(
    compression({
      threshold: 512, // set the threshold to 512 bytes
    }),
  );
  const sess: session.SessionOptions = {
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
    },
  };
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    if (sess.cookie) {
      sess.cookie.secure = true; // serve secure cookies
    }
  }
  app.use(session(sess));
  app.use(helmet());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
