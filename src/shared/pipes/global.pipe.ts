import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Logger,
} from '@nestjs/common';

@Injectable()
export class GlobalPipe implements PipeTransform {
  private readonly _logger = new Logger(GlobalPipe.name);
  transform(value: any, metadata: ArgumentMetadata) {
    this._logger.log(`TRIGGER!`);
    return value;
  }
}
