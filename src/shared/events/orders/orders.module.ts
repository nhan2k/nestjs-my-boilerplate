import { Module } from '@nestjs/common';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { OrdersEventService } from './orders.service';

@Module({
  providers: [OrderCreatedListener, OrdersEventService],
  exports: [OrdersEventService],
})
export class OrdersEventModule {}
