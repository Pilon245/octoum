import { Module } from '@nestjs/common';
import { AppController } from './cities/app.controller';
import { AppService } from './cities/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
