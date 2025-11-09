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
      search,
      minPrice,
      maxPrice,
    } = paginationDto;

    const skip = (page - 1) * limit;

    const qb = this.productRepository.createQueryBuilder('product');

    if (search) {
      qb.andWhere('product.name ILIKE :q', { q: `%${search}%` });
    }
    if (minPrice) {
      qb.andWhere('product.price >= :minPrice', { minPrice });
    }
    if (maxPrice) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice });
    }
    if (categoryId) {
      qb.andWhere('product.categoryId = :categoryId', { categoryId });
    }
    qb.orderBy(`product.${sortBy}`, order === 'DESC' ? 'DESC' : 'ASC');

    qb.offset(skip).limit(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, updateProductDto);

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    await this.productRepository.delete({ id });
    return true;
  }
}