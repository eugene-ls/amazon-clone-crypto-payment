import { Controller, Post, Delete, Get, Param, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  addToWishlist(@Param('productId') productId: number, @Req() req: any) {
    const userId = req.user?.id ?? 1;
    return this.wishlistService.add(userId, productId);
  }

  @Delete(':productId')
  removeFromWishlist(@Param('productId') productId: number, @Req() req: any) {
    const userId = req.user?.id ?? 1;
    return this.wishlistService.remove(userId, productId);
  }

  @Get()
  getWishlist(@Req() req: any) {
    const userId = req.user?.id ?? 1;
    return this.wishlistService.getAll(userId);
  }
}