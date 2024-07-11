import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  private readonly _logger = new Logger(CacheService.name);
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  async set(key: string, value: unknown): Promise<void> {
    this._logger.log(`${this.set.name} TRIGGER!`);
    try {
      await this.cacheManager.set(
        `${this.configService.get<string>('CACHE_GLOBAL_KEY')}::${key}`,
        JSON.stringify(value),
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async get<T>(key: string): Promise<T | undefined> {
    this._logger.log(`${this.get.name} TRIGGER!`);
    try {
      const jsonData: string | undefined = await this.cacheManager.get<string>(
        `${this.configService.get<string>('CACHE_GLOBAL_KEY')}::${key}`,
      );
      return jsonData ? JSON.parse(jsonData) : undefined;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async del<T>(key: string): Promise<void> {
    this._logger.log(`${this.del.name} TRIGGER!`);
    try {
      await this.cacheManager.del(
        `${this.configService.get<string>('CACHE_GLOBAL_KEY')}::${key}`,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async reset(): Promise<void> {
    this._logger.log(`${this.reset.name} TRIGGER!`);
    try {
      await this.cacheManager.reset();
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
