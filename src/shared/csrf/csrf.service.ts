import { Injectable } from '@nestjs/common';
import { createHmac, randomBytes } from 'crypto';

@Injectable()
export class CsrfService {
  private readonly secretLength = 16; // Length of the secret key

  generateSecret(): string {
    return randomBytes(this.secretLength).toString('hex');
  }

  generateToken(secret: string): string {
    return createHmac('sha256', secret).update('csrf-token').digest('hex');
  }

  validateToken(secret: string, token: string): boolean {
    const validToken = this.generateToken(secret);
    return validToken === token;
  }
}
