import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { Cat } from './features/cats/entities/cat.entity';
import { AxiosError } from 'axios';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly httpService: HttpService) {}

  async getHello(): Promise<Cat[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Cat[]>('http://localhost:3000/api/cats').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
