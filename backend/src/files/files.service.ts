import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  async saveFile(file: Express.Multer.File) {
    const uploadsDir = join(process.cwd(), 'uploads');
    if (!existsSync(uploadsDir)) mkdirSync(uploadsDir);
    const safeName = `${Date.now()}-${file.originalname}`.replace(/\s+/g, '_');
    const fullPath = join(uploadsDir, safeName);
    writeFileSync(fullPath, file.buffer);
    return { fileName: safeName, url: `/uploads/${safeName}` };
  }
}