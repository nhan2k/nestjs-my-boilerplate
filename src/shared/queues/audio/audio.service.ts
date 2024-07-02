import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AudioService {
  private readonly _logger = new Logger(AudioService.name);
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}
  async transcode(): Promise<void> {
    this._logger.debug('Start transcoding...');
    for (let index = 0; index < 100; index++) {
      await this.audioQueue.add('transcode', {
        file: 'audio.mp3',
      });
    }
    this._logger.debug('Transcoding completed');
  }
}
