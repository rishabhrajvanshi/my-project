import { Injectable } from '@nestjs/common';
import { DatabaseLibService } from 'lib_/database-lib';

@Injectable()
export class AppService {
  constructor(private readonly databaseLibService: DatabaseLibService) {}
  
  async getHello(): Promise<any[]> {
    try {
      const prisma = this.databaseLibService.getPrisma();
      const users = await prisma.user.findMany();   //select * from users;
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      try {
        const prisma = this.databaseLibService.getPrisma();
        const users = await prisma.$queryRaw`SELECT * FROM users`;
        return users as any[];
      } catch (rawError) {
        console.error('Error with raw query:', rawError);
        return [];
      }
    }
  }
}
