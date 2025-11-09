import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
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
    const product = await this.productRepository.findOne({ where: { id: +id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (updateProductDto.name !== undefined) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.price !== undefined) {
      product.price = updateProductDto.price;
    }

    if (updateProductDto.description !== undefined) {
      product.description = updateProductDto.description;
    }

    if (updateProductDto.image !== undefined) {
      product.image = updateProductDto.image;
    }

    if (updateProductDto.categoryId !== undefined) {
      product.categoryId = updateProductDto.categoryId;
    }

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ id: +id });
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    await this.productRepository.delete(product);

    return true;
  }
}