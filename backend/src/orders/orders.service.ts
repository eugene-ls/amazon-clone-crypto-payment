import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity/order.entity';
import { OrderItem } from './entities/order-item.entity/order-item.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateOrderDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    });
    if (!user) throw new NotFoundException('User not found');

    let totalPrice = 0;

    const order = this.orderRepository.create({
      user,
      status: 'pending',
      totalPrice: 0,
    });

    await this.orderRepository.save(order);

    for (const item of dto.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) throw new NotFoundException(`Product ${item.productId} not found`);

      const price = Number(product.price) * item.quantity;
      totalPrice += price;

      const orderItem = this.orderItemRepository.create({
        order,
        product,
        quantity: item.quantity,
        price: Number(product.price),
      });

      await this.orderItemRepository.save(orderItem);
    }

    order.totalPrice = totalPrice;
    return await this.orderRepository.save(order);
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByUser(userId: number) {
    return await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
  }

  async updateStatus(id: number, status: string) {
    const order = await this.orderRepository.findOne({ where: { id }});
    if (!order) throw new NotFoundException('Order not found');

    order.status = status;
    return this.orderRepository.save(order);
  }
}
