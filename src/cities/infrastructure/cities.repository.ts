import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CitiesDocument, City } from './domain/entities/cities.entity';
import { List, ListDocument } from './domain/entities/list.entity';
import {
  CityFactory,
  CreateCitiesDTO,
  UpdateCitiesDTO,
} from './domain/dto/cities.dto';

@Injectable()
export class CitiesRepository {
  constructor(
    @InjectModel(City.name) private cityModel: Model<CitiesDocument>,
    @InjectModel(List.name) private listModel: Model<ListDocument>,
  ) {}
  async findByName(name: string) {
    return this.cityModel.findOne({
      city: name,
    });
  }
  async create(city: CityFactory) {
    const createCity = await new this.cityModel(city);
    await createCity.save();
    return city;
  }
  async update(id: string, model: UpdateCitiesDTO) {
    const result = await this.cityModel.updateOne(
      { id },
      {
        city: model.city,
        date: model.date,
      },
    );
    return result.matchedCount === 1;
  }
  async delete(id: string) {
    const result = await this.cityModel.deleteOne({ id });
    return result.deletedCount === 1;
  }
}
