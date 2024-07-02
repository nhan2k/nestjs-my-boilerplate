import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersEventService } from 'src/shared/events/orders/orders.service';

@Injectable()
export class OrdersService {
  constructor(private readonly orderEvent: OrdersEventService) {}

  create(createOrderDto: CreateOrderDto) {
    this.orderEvent.handleOrderCreatedEvent(createOrderDto);
    return createOrderDto;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
