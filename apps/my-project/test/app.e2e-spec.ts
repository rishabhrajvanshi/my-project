import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './../src/app.module';
import { join } from 'path';

describe('AppController (e2e) - gRPC', () => {
  let microservice: INestMicroservice;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    microservice = moduleFixture.createNestMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(__dirname, '../../../proto/user.proto'),
        url: '0.0.0.0:5002', // Use different port for testing
      },
    });
    
    await microservice.listen();
  });

  afterEach(async () => {
    if (microservice) {
      await microservice.close();
    }
  });

  it('should initialize gRPC microservice', () => {
    expect(microservice).toBeDefined();
  });
});
