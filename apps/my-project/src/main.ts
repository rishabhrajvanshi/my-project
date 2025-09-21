import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  // Create only gRPC microservice
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(__dirname, '../../../proto/user.proto'),
        url: '0.0.0.0:5001',
      },
    },
  );
  
  await microservice.listen();
  console.log('gRPC server is listening on port 5001');
}
bootstrap();
