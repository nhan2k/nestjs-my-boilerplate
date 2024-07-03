import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CatsModule, UserModule, OrdersModule, AuthModule],
  exports: [AuthModule],
})
export class FeaturesModule {}
