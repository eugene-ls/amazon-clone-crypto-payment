import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }
  async findAll(paginationDto: PaginationDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      order = 'ASC',
      categoryId,
    } = paginationDto;

    const skip = (page - 1) * limit;

    const query = this.productRepository
      .createQueryBuilder('product')
      .skip(skip)
      .take(limit)
      .orderBy(`product.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC');

    if (categoryId) {
      query.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
    };
  }
  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: +id },
    });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    return product;
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id: +id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, updateProductDto);

    return await this.productRepository.save(product);
  }
  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ id: +id });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    await this.productRepository.delete({ id: +id });
    return true;
  }
}