import { ApiProperty } from '@nestjs/swagger';

export class AddImagesDto {
  @ApiProperty({ type: 'string', isArray: true })
  images: string[];
}
