import { Injectable } from '@nestjs/common';
import { orderDto } from './orders.dto';

@Injectable()
export class AppService {

  orders: orderDto[] = [];

  handleOrderplace(order: orderDto) {
    console.log('Order placed: ', order);
    this.orders.push(order);
  }

  getOrders() {
    return this.orders;
  }
}
