import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayloadType } from 'src/lib/types/jwt-payload.type';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService, private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        })
    }

    async validate(payload: JwtPayloadType) {
        const user = await this.authService.validateUser(payload.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        return { id: user.id, email: user.email, role: user.role }
    }
}