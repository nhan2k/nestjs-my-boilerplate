import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AudioProcessor } from './audio.processor';
import { AudioService } from './audio.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
    }),
  ],
  providers: [AudioProcessor, AudioService],
})
export class AudioModule {}
