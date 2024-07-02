import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  Session,
  Sse,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  Response as NestResponse,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { Observable, map, of } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Session() session: Record<string, any>): Promise<any> {
    session.visits = session.visits ? session.visits + 1 : 1;
    console.log(
      '🚀 ~ AppController ~ getHello ~ session.visits:',
      session.visits,
    );
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
    console.log(file);
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
}
