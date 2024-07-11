import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModuleAsyncOptions } from '@nestjs/platform-express';
import { randomBytes } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOption: MulterModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    limits: {
      fileSize: 8000000,
    },
    dest: configService.get<string>('MULTER_DEST'),
    storage: diskStorage({
      destination: configService.get<string>('MULTER_DEST'),
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + randomBytes(1);
        const ext = extname(file.originalname);
        const filename = `${file.originalname.slice(0, 5)}${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
  }),
  inject: [ConfigService],
};
