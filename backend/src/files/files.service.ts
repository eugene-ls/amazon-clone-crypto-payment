import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  async saveFile(file: Express.Multer.File) {
    const uploadPath = join(process.cwd(), 'uploads', file.originalname);

    writeFileSync(uploadPath, file.buffer);

    return {
      originalName: file.originalname,
      fileName: file.originalname,
      path: `/uploads/${file.originalname}`,
    };
  }
}