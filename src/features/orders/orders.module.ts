import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersEventModule } from 'src/shared/events/orders/orders.module';
import { OrdersEventService } from 'src/shared/events/orders/orders.service';

@Module({
  imports: [OrdersEventModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersEventService],
})
export class OrdersModule {}
