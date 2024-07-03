import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { CsrfService } from '../csrf/csrf.service';
import { NextFunction, Response } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private readonly _logger = new Logger(CsrfMiddleware.name);
  constructor(private readonly csrfService: CsrfService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this._logger.log(`${req.url}, ${req.method} TRIGGER!`);
    if (req.method === 'GET') {
      const secret = this.csrfService.generateSecret();
      const token = this.csrfService.generateToken(secret);
      res.cookie('csrf-secret', secret, { httpOnly: true, secure: true });
      res.locals.csrfToken = token;
    }
    next();
  }
}
