import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'database/entities';
import { RegisterRequestDto } from './dto/register-request.dto';
import { UserService } from '../user/user.service';
import { RegisterResultDto } from './dto/register-result.dto';
import { SmtpService } from 'src/lib/services/smtp.service';
import { MailPurposeEnum } from 'src/lib/enums/mail-purpose.enum';
import { ConfigService } from '@nestjs/config';
import { generateRandomCode } from 'src/lib/helpers/generateCode';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { ConfirmCodeRequestDto } from './dto/confirm-code-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private smtpService: SmtpService,
    private configService: ConfigService,
    @InjectRedis() private redis: Redis,
  ) { }

  async validateUser(email: string): Promise<User> {
    const user: User = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async sendMail(dto: RegisterRequestDto) {
    const appMode = this.configService.get("APP_MODE")
    let code
    if (appMode === 'PROD') {
      code = generateRandomCode()
      this.smtpService.sendMail({ email: dto.email }, MailPurposeEnum.AUTH, { verificationCode: code })
    } else {
      code = '000000'
    }
    this.redis.set(`authCode:${dto.email}`, code)
    this.redis.expire(`authCode:${dto.email}`, 120)
    return
  }

  async login(user: User): Promise<RegisterResultDto> {
    const payload = { email: user.email, id: user.id, role: user.role };
    return { token: this.jwtService.sign(payload), user };
  }

  async register(user: ConfirmCodeRequestDto): Promise<RegisterResultDto> {

    const existingUser = await this.userService.findOneByEmail(user.email);
    const redisCode = await this.redis.get(`authCode:${user.email}`)
    if (!redisCode || user.code != redisCode) {
      throw new BadRequestException('Code is invalid');
    }
    if (existingUser) {
      return this.login(existingUser);
    }
    
    const newUser = await this.userService.create({ email: user.email });

    return this.login(newUser);
  }
}