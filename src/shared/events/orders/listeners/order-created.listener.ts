import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';

@Injectable()
export class OrderCreatedListener {
  private readonly _logger = new Logger(OrderCreatedListener.name);
  @OnEvent('order.created')
  async handleOrderCreatedEvent(event: OrderCreatedEvent): Promise<void> {
    this._logger.log(`Before... TRIGGER!`);
    const now = Date.now();
    // handle and process "OrderCreatedEvent" event
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._logger.log(event);
        resolve(this._logger.log(`After... ${Date.now() - now}ms TRIGGER!`));
      }, 5000); // 5 seconds
    });
  }
}
