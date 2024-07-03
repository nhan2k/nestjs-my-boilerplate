import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';

export const serveStaticOption: ServeStaticModuleOptions = {
  rootPath: join(__dirname, '..', 'uploads'),
  serveRoot: '/uploads', // This sets the URL prefix for serving static files
};
