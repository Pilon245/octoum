import { Module } from '@nestjs/common';
import { CitiesService } from './application/cities.service';
import { CitiesController } from './api/cities.controller';
import { CitiesRepository } from './infrastructure/cities.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CitiesQueryRepository } from './infrastructure/cities.query.repository';
import { CitiesSchema, City } from './domain/entities/cities.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitiesSchema }]),
  ],
  controllers: [CitiesController],
  providers: [CitiesService, CitiesRepository, CitiesQueryRepository],
  exports: [CitiesQueryRepository],
})
export class CitiesModule {}
