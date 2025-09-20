import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseLibModule } from 'lib_/database-lib';

@Module({
  imports: [DatabaseLibModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
