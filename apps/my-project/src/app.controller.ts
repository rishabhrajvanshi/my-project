import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface GetUsersRequest {
  // Empty for now
}

export interface GetUsersResponse {
  users: User[];
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UserService', 'GetUsers')
  async getUsers(data: GetUsersRequest): Promise<GetUsersResponse> {
    const users = await this.appService.getHello();
    return { users };
  }
}
