import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { ProductModule } from './core/product/product.module';
import { OrderModule } from './core/order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';
import { dataSourceOptions } from 'database/datasource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibModule } from './lib/lib.module';
import { SpecificationModule } from './core/specification/specification.module';
import { APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './lib/pipes/custom-validation.pipe';

@Module({
  imports: [AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: configService.get('REDIS_URL')

      }),
    }), TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dataSourceOptions,
    }),

    LibModule,

    SpecificationModule,
  ],
  controllers: [],
 
})
export class AppModule { }
