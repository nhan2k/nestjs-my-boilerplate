import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private readonly _logger = new Logger(ValidationPipe.name);
  transform(value: any, metadata: ArgumentMetadata) {
    this._logger.log(`TRIGGER!`);
    return value;
  }
}
