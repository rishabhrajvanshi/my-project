import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma';

@Injectable()
export class DatabaseLibService implements OnModuleInit {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    await this.dbConnect();
  }

  async dbConnect() {
    try {
      // Test raw query
      const result = await this.prisma.$queryRaw`SELECT 1 as test`;
      console.log('✅ Database connection successful!');
      console.log('Test query result:', result);
      return result;
    } catch (error) {
      console.error('❌ Database connection failed:');
      console.error(error.message);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  getPrisma(): PrismaClient {
    return this.prisma;
  }
}
