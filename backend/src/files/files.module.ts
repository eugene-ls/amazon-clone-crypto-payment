import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [MulterModule.register(multerConfig)],
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
