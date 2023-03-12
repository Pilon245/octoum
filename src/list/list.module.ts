import { Module } from '@nestjs/common';
import { CitiesService } from './application/cities.service';
import { CitiesController } from './api/cities.controller';
import { CitiesRepository } from './infrastructure/cities.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CitiesSchema, City } from './domain/entities/cities.entity';
import { List, ListSchema } from './domain/entities/list.entity';
import { CitiesQueryRepository } from './infrastructure/cities.query.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: City.name, schema: CitiesSchema },
      { name: List.name, schema: ListSchema },
    ]),
  ],
  controllers: [CitiesController],
  providers: [CitiesService, CitiesRepository, CitiesQueryRepository],
})
export class CitiesModule {}
