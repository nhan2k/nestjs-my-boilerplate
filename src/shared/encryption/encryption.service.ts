import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { algorithm } from './constants';

@Injectable()
export class EncryptionService {
  iv: Buffer;
  textToEncrypt: string;
  constructor(private readonly configService: ConfigService) {
    const size = parseInt(this.configService.get('SIZE_RANDOM_BYTES') ?? '16');
    this.iv = randomBytes(size);
    this.textToEncrypt =
      this.configService.get<string>('TEXT_TO_ENCRYPT') ?? '';
  }

  async encrypt(text: string): Promise<{
    key: Buffer;
    encryptedText: Buffer;
  }> {
    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(text, 'salt', 32)) as Buffer;
    const cipher = createCipheriv(algorithm, key, this.iv);
    const encryptedText = Buffer.concat([
      cipher.update(this.textToEncrypt),
      cipher.final(),
    ]);
    return {
      key,
      encryptedText,
    };
  }

  async decypt(key: Buffer): Promise<Buffer> {
    const decipher = createDecipheriv(algorithm, key, this.iv);
    return Buffer.concat([
      decipher.update(Buffer.from(this.textToEncrypt)),
      decipher.final(),
    ]);
  }
}
