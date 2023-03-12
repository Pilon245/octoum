import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from '../domain/entities/list.entity';

@Injectable()
export class ListQueryRepository {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}
  async findAll() {
    const lists = await this.listModel.find();
    return lists.map((c) => ({
      id: c.id,
      shortName: c.shortName,
      longName: c.longName,
      color: c.color,
      cities: c.cities,
    }));
  }

  async findById(id: string) {
    const list = await this.listModel.findOne({
      id,
    });
    if (!list) return false;
    return {
      id: list.id,
      shortName: list.shortName,
      longName: list.longName,
      color: list.color,
      cities: list.cities,
    };
  }
}
