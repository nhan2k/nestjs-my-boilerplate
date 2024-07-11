import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalGuard implements CanActivate {
  private readonly _logger = new Logger(GlobalGuard.name);
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this._logger.log(`TRIGGER!`);
    const request = context.switchToHttp().getRequest(); // Compliant: no unnecessary assignment
    return true;
  }
}
