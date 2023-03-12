import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeleteController } from './delete.all';
import { CitiesSchema, City } from '../cities/domain/entities/cities.entity';
import { List, ListSchema } from '../list/domain/entities/list.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: List.name, schema: ListSchema },
      { name: City.name, schema: CitiesSchema },
    ]),
  ],
  controllers: [DeleteController],
})
export class DeleteModule {}
