import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SortService } from './sortService.service';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [SwaggerModule],
  controllers: [AppController],
  providers: [AppService, SortService],
})
export class AppModule {}
