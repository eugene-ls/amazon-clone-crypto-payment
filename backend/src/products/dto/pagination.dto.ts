import {
  IsOptional,
  IsNumber,
  IsString,
  IsIn,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10;

  // Sort field
  @IsOptional()
  @IsString()
  @IsIn(['name', 'price', 'createdAt'])
  sortBy?: string = 'name';

  // asc | desc
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: string = 'asc';

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  search?: string;
}