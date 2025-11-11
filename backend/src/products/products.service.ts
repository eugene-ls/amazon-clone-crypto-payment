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

  async create(dto: CreateProductDto) {
    const product = this.productRepository.create(dto);
    return await this.productRepository.save(product);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);

    Object.assign(product, dto);

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productRepository.delete({ id });
    return true;
  }

  async addImages(id: number, files: Express.Multer.File[]) {
    const product = await this.findOne(id);

    const newImages = files.map((file) => `/uploads/${file.filename}`);

    if (!product.images) product.images = [];

    product.images = [...product.images, ...newImages];

    return this.productRepository.save(product);
  }
}