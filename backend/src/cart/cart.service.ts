import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async add(
    userId: number,
    productId: number,
    quantity: number = 1,
  ): Promise<Cart> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const existingItem = await this.cartRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
      relations: ['product', 'user'],
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      return await this.cartRepository.save(existingItem);
    }

    const cart = this.cartRepository.create({
      user,
      product,
      quantity,
    });
    return await this.cartRepository.save(cart);
  }

  async remove(userId: number, productId: number): Promise<boolean> {
    const existingItem = await this.cartRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
    });

    if (!existingItem) throw new NotFoundException('Product not found in cart');

    await this.cartRepository.delete(existingItem.id);
    return true;
  }

  async getAll(userId: number): Promise<Cart[]> {
    return await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }
}
