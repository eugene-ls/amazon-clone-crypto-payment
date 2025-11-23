import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import ms from 'ms';
import crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthProvidersEnum } from './auth-providers.enum';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { NullableType } from '../utils/types/nullable.type';
import { LoginResponseDto } from './dto/login-response.dto';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { UsersService } from '../users/users.service';
import { AllConfigType } from '../config/config.type';
import { RoleEnum } from '../roles/roles.enum';
import { Session } from '../session/domain/session';
import { SessionService } from '../session/session.service';
import { StatusEnum } from '../statuses/statuses.enum';
import { User } from '../users/domain/user';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private sessionService: SessionService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  // LOGIN
  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { email: 'notFound' },
      });
    }

    if (user.provider !== AuthProvidersEnum.email) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { email: `needLoginViaProvider:${user.provider}` },
      });
    }

    if (!user.password) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { password: 'incorrectPassword' },
      });
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { password: 'incorrectPassword' },
      });
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = await this.sessionService.create({ user, hash });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.role,
      sessionId: session.id,
      hash,
    });

    return { refreshToken, token, tokenExpires, user };
  }

  // SOCIAL LOGIN
  async validateSocialLogin(
    authProvider: string,
    socialData: SocialInterface,
  ): Promise<LoginResponseDto> {
    let user: NullableType<User> = null;

    const socialEmail = socialData.email?.toLowerCase() ?? null;
    let userByEmail: NullableType<User> = null;

    if (socialEmail) {
      userByEmail = await this.usersService.findByEmail(socialEmail);
    }

    if (socialData.id) {
      user = await this.usersService.findBySocialIdAndProvider({
        socialId: socialData.id,
        provider: authProvider,
      });
    }

    if (user) {
      if (socialEmail && !userByEmail) user.email = socialEmail;
      await this.usersService.update(user.id, user);
    } else if (userByEmail) {
      user = userByEmail;
    } else if (socialData.id) {
      user = await this.usersService.create({
        email: socialEmail,
        firstName: socialData.firstName ?? null,
        lastName: socialData.lastName ?? null,
        socialId: socialData.id,
        provider: authProvider,
        role: { id: 1 },
        status: { id: StatusEnum.active },
      });

      user = await this.usersService.findById(user.id);
    }

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { user: 'userNotFound' },
      });
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = await this.sessionService.create({ user, hash });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.role,
      sessionId: session.id,
      hash,
    });

    return { refreshToken, token, tokenExpires, user };
  }

  // REGISTER
  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const exists = await this.usersService.findByEmail(dto.email);

    if (exists) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { email: 'emailExists' },
      });
    }

    await this.usersService.create({
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      provider: AuthProvidersEnum.email,
      role: { id: 1 },
      status: { id: StatusEnum.active },
    });
  }

  // ME
  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
    return this.usersService.findById(userJwtPayload.id);
  }

  // UPDATE PROFILE
  async update(
    userJwtPayload: JwtPayloadType,
    userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    const currentUser = await this.usersService.findById(userJwtPayload.id);

    if (!currentUser) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { user: 'userNotFound' },
      });
    }

    if (userDto.password && userDto.oldPassword) {
      const isValidOldPassword = await bcrypt.compare(
        userDto.oldPassword,
        currentUser.password ?? '',
      );

      if (!isValidOldPassword) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { oldPassword: 'incorrectOldPassword' },
        });
      }

      await this.sessionService.deleteByUserIdWithExclude({
        userId: currentUser.id,
        excludeSessionId: userJwtPayload.sessionId,
      });
    }

    delete userDto.oldPassword;

    await this.usersService.update(userJwtPayload.id, userDto);

    return this.usersService.findById(userJwtPayload.id);
  }

  // REFRESH TOKEN
  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId' | 'hash'>,
  ): Promise<Omit<LoginResponseDto, 'user'>> {
    const session = await this.sessionService.findById(data.sessionId);

    if (!session) throw new UnauthorizedException();
    if (session.hash !== data.hash) throw new UnauthorizedException();

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.usersService.findById(session.user.id);

    if (!user?.role) throw new UnauthorizedException();

    await this.sessionService.update(session.id, { hash });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: { id: user.role.id },
      sessionId: session.id,
      hash,
    });

    return { token, refreshToken, tokenExpires };
  }

  // DELETE USER
  async softDelete(user: User): Promise<void> {
    await this.usersService.remove(user.id);
  }

  // LOGOUT
  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.deleteById(data.sessionId);
  }

  // TOKEN GENERATION
  private async getTokensData(data: {
    id: User['id'];
    role: User['role'];
    sessionId: Session['id'];
    hash: Session['hash'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),

      this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return { token, refreshToken, tokenExpires };
  }
}
