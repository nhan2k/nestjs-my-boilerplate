import { Injectable, Logger } from '@nestjs/common';
import { OrderCreatedEvent } from './events/order-created.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrdersEventService {
  private readonly _logger = new Logger(OrdersEventService.name);

  constructor(private eventEmitter: EventEmitter2) {}

  handleOrderCreatedEvent(order: OrderCreatedEvent) {
    this._logger.log(`TRIGGER!`);
    const orderCreatedEvent = new OrderCreatedEvent();
    orderCreatedEvent.name = order.name;
    orderCreatedEvent.description = order.description;
    this.eventEmitter.emit('order.created', orderCreatedEvent);
  }
}
