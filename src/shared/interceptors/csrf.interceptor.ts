import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CsrfService } from '../csrf/csrf.service';
import { Request } from 'express';

@Injectable()
export class CsrfInterceptor implements NestInterceptor {
  private readonly _logger = new Logger(CsrfInterceptor.name);
  constructor(private readonly csrfService: CsrfService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const secret = req.cookies['csrf-secret'];
    const token = req.headers['x-csrf-token'] as string;

    if (req.method === 'GET') {
      return next.handle();
    }

    if (!this.csrfService.validateToken(secret, token)) {
      throw new BadRequestException('Invalid CSRF token');
    }

    return next.handle();
  }
}
