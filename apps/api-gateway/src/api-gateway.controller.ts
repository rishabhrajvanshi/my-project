import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService, User } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  async getfromgrpc(): Promise<User[]> {
    return this.apiGatewayService.getfromgrpc();
  }
}
