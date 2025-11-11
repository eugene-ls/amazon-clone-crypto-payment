import { IsArray, IsString } from 'class-validator';

export class CreateProductImagesDto {
  @IsArray()
  @IsString({ each: true })
  images: string[];
}
