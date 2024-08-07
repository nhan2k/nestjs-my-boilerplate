import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  Sse,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  Response as NestResponse,
  Body,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { Observable, map, of } from 'rxjs';
import { CsrfInterceptor } from './shared/interceptors/csrf.interceptor';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  private readonly _logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
  ) {
    return;
  }

  @Get('file/:name')
  @Header('Content-Type', 'image/jpeg')
  @Header(
    'Content-Disposition',
    'attachment; filename="fedor1719500749191-11038435.jpeg"',
  )
  getFile(
    @Res({ passthrough: true }) res: Response,
    @Param('name') name: string,
  ): StreamableFile {
    const file = createReadStream(join(process.cwd(), `uploads/${name}`));
    return new StreamableFile(file);
  }

  @Get('index')
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }

  @Get('index2')
  index2(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index2.html')).toString());
  }

  @Sse('sse/:id')
  sse(
    @Param('id') id: string,
    @Res() res: typeof NestResponse,
  ): Observable<MessageEvent> {
    return of([1, 2]).pipe(
      map((_) => ({ data: { hello: id } }) as MessageEvent),
    );
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get('csrf-token')
  getCsrfToken(@Res({ passthrough: true }) res: Response) {
    return { csrfToken: res.locals.csrfToken };
  }

  @Post('protected')
  @UseInterceptors(CsrfInterceptor)
  protectedRoute(@Body() body: any) {
    return { message: 'Protected route accessed', body };
  }
}
