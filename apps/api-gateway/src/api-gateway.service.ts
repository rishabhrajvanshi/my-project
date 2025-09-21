import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';

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

interface UserService {
  getUsers(request: GetUsersRequest): Observable<GetUsersResponse>;
}

@Injectable()
export class ApiGatewayService implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  async getfromgrpc(): Promise<User[]> {
    // Wait a bit for gRPC connection to be ready
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const result = await lastValueFrom(
        this.userService.getUsers({})
      );
      return result.users;
    } catch (error) {
      console.error('gRPC call failed:', error);
      
      // Retry once after a delay
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Retrying gRPC call...');
        const retryResult = await lastValueFrom(
          this.userService.getUsers({})
        );
        return retryResult.users;
      } catch (retryError) {
        console.error('gRPC retry also failed:', retryError);
        return [];
      }
    }
  }
}
