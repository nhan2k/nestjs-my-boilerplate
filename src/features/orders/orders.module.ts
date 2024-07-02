import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersEventModule } from 'src/shared/events/orders/orders.module';

@Module({
  imports: [OrdersEventModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
