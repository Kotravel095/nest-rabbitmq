import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { orderDto } from './orders.dto';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class OrdersService implements OnModuleInit {
  @Inject('ORDER_SERVICE') private rabbitClient: ClientProxy;

  // เมื่อ module ถูกโหลด
  onModuleInit() {
    // ทดสอบการเชื่อมต่อ
    this.rabbitClient.connect().then(() => {
      console.log('Connected to RabbitMQ');
    }).catch((err) => {
      console.error('Error connecting to RabbitMQ:', err);
    });
  }

  placeOrder(order: orderDto) {
    this.rabbitClient.emit('place_order', order);
    return { message: 'Order placed successfully' };
  }

  getOrders() {
    return this.rabbitClient.send({ cmd: 'fetch-orders' }, {})
    .pipe(timeout(5000));
  }
}
