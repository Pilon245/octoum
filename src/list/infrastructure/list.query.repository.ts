import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CitiesDocument, City } from '../domain/entities/cities.entity';
import { List, ListDocument } from '../domain/entities/list.entity';
import { CityFactory, CreateCitiesDTO } from '../domain/dto/cities.dto';

@Injectable()
export class CitiesQueryRepository {
  constructor(
    @InjectModel(City.name) private cityModel: Model<CitiesDocument>,
    @InjectModel(List.name) private listModel: Model<ListDocument>,
  ) {}
  async findAll() {
    const cities = await this.cityModel.find();
    return cities.map((c) => ({
      id: c.id,
      city: c.city,
      date: c.date,
    }));
  }

  async findById(id: string) {
    const cities = await this.cityModel.findOne({
      id,
    });
    if (!cities) return false;
    return {
      id: cities.id,
      city: cities.city,
      date: cities.date,
    };
  }
}
