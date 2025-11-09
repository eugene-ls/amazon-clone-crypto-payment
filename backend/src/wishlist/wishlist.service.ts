import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async add(userId: number, productId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('Product not found');

    const wishlist = this.wishlistRepository.create({ user, product });
    return await this.wishlistRepository.save(wishlist);
  }

  async remove(userId: number, productId: number) {
    await this.wishlistRepository.delete({
      user: { id: userId },
      product: { id: productId },
    });
    return true;
  }

  async getAll(userId: number) {
    return await this.wishlistRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }
}