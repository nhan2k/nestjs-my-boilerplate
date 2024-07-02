import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  private readonly _logger = new Logger(ExcludeNullInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this._logger.log(`TRIGGER!`);
    return next.handle().pipe(map((value) => (value === null ? '' : value)));
  }
}
