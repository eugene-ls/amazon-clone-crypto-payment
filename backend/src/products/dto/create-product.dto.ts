import {
  IsString,
  IsNumber,
  IsUrl,
  MinLength,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @MaxLength(200)
  description: string;

  @IsString()
  @IsUrl()
  image: string;

  @IsNumber()
  @Min(1)
  categoryId: number;
}