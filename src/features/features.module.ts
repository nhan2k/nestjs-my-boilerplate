import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CatsModule, UserModule, OrdersModule],
  exports: [CatsModule, UserModule],
})
export class FeaturesModule {}
