import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from './common';
import {
  getEnvFile,
  ThrottlerConfig,
  validationSchema,
  TypeOrmConfig,
} from './config';
import {
  GroupProductsModule,
  HealthModule,
  ProductGroupsModule,
  ProductsModule,
  StoresModule,
  UsersModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFile(),
      validationSchema,
    }),

    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),

    ThrottlerModule.forRootAsync({ useClass: ThrottlerConfig }),

    CommonModule,

    GroupProductsModule,

    HealthModule,

    ProductGroupsModule,

    ProductsModule,

    StoresModule,

    UsersModule,
  ],
})
export class AppModule {}
