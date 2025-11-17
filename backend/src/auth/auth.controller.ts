import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { User } from '../users/domain/user';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  // LOGIN
  @SerializeOptions({ groups: ['me'] })
  @Post('email/login')
  @ApiOkResponse({ type: LoginResponseDto })
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: AuthEmailLoginDto) {
    return this.service.validateLogin(loginDto);
  }

  // REGISTER
  @Post('email/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: AuthRegisterLoginDto) {
    await this.service.register(createUserDto);
    return { message: 'registered' };
  }

  // REMOVE ALL CONFIRM / FORGOT METHODS
  // (потому что ты их удалил из AuthService)

  // ME
  @ApiBearerAuth()
  @SerializeOptions({ groups: ['me'] })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User })
  @HttpCode(HttpStatus.OK)
  public me(@Request() req) {
    return this.service.me(req.user);
  }

  // REFRESH TOKEN
  @ApiBearerAuth()
  @ApiOkResponse({ type: RefreshResponseDto })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public refresh(@Request() req) {
    return this.service.refreshToken({
      sessionId: req.user.sessionId,
      hash: req.user.hash,
    });
  }

  // LOGOUT
  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Request() req) {
    await this.service.logout({ sessionId: req.user.sessionId });
  }

  // UPDATE
  @ApiBearerAuth()
  @SerializeOptions({ groups: ['me'] })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User })
  public update(@Request() req, @Body() dto: AuthUpdateDto) {
    return this.service.update(req.user, dto);
  }

  // DELETE ACCOUNT
  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Request() req) {
    return this.service.softDelete(req.user);
  }
}