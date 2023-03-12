import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CitiesDocument, City } from '../domain/entities/cities.entity';

@Injectable()
export class CitiesQueryRepository {
  constructor(
    @InjectModel(City.name) private cityModel: Model<CitiesDocument>,
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

  async findByName(city: string) {
    const list = await this.cityModel.findOne({
      city,
    });
    if (!list) return false;
    return {
      id: list.id,
    };
  }
}
