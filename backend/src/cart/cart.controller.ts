import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Req,
  Body,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller({
  path: 'cart',
  version: '1',
})
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':productId')
  addToCart(
    @Param('productId') productId: number,
    @Body('quantity') quantity: number = 1,
  ): Promise<any> {
    return this.cartService.add(productId, quantity);
  }

  @Delete(':productId')
  removeFromCart(@Param('productId') productId: number, @Req() req: any) {
    const userId = req.user?.id ?? 1;
    return this.cartService.remove(productId, userId);
  }

  @Get()
  getAll(@Req() req: any) {
    const userId = req.user?.id ?? 1;
    return this.cartService.getAll(userId);
  }
}
