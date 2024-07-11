import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  saltOrRounds: string | number;
  constructor(private readonly configService: ConfigService) {
    this.saltOrRounds =
      this.configService.get<string | number>('SALT_OR_ROUNDS') ?? 10;
  }

  async hashing(text: string): Promise<string> {
    return await bcrypt.hash(text, this.saltOrRounds);
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
