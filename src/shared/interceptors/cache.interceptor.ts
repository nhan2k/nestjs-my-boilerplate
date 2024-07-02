import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly _logger = new Logger(CacheInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this._logger.log(`TRIGGER!`);
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}
