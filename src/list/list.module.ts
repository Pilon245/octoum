import { Module } from '@nestjs/common';
import { ListService } from './application/list.service';
import { ListController } from './api/list.controller';
import { ListRepository } from './infrastructure/list.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './domain/entities/list.entity';
import { ListQueryRepository } from './infrastructure/list.query.repository';
import { ListExistsRule } from './domain/cities-validation.service';
import { CitiesModule } from '../cities/cities.module';

@Module({
  imports: [
    CitiesModule,
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
  ],
  controllers: [ListController],
  providers: [ListService, ListRepository, ListQueryRepository, ListExistsRule],
})
export class ListModule {}
