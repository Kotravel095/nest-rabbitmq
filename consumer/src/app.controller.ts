import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { orderDto } from './orders.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('place_order')
  handleOrderplace(@Payload() order: orderDto) {
    return this.appService.handleOrderplace(order);
  }

  @MessagePattern({ cmd: 'fetch-orders' })
  getOrders() {
    return this.appService.getOrders();
  }
}
