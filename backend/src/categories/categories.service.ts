import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { Product } from '../products/entities/product.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async create(category: Partial<Category>): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({ id: +id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id: +id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = dto.name;

    return await this.categoryRepository.save(category);
  }
  async remove(id: string) {
    const category = await this.categoryRepository.findOneBy({ id: +id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.delete({ id: +id });

    return true;
  }
  async findProduct(id: string) {
    return this.productRepository.find({
      where: { categoryId: +id },
    });
  }
}