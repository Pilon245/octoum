import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from '../domain/entities/list.entity';
import { ListFactory, UpdateListDTO } from '../domain/dto/list.dto';

@Injectable()
export class ListRepository {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}
  async findByName(name: string) {
    return this.listModel.findOne({
      shortName: name,
    });
  }
  async create(list: ListFactory) {
    const createList = await new this.listModel(list);
    await createList.save();
    return list;
  }
  async update(id: string, model: UpdateListDTO) {
    const result = await this.listModel.updateOne(
      { id },
      {
        shortName: model.shortName,
        longName: model.longName,
        color: model.color,
        cities: model.cities,
      },
    );
    return result.matchedCount === 1;
  }
  async delete(id: string) {
    const result = await this.listModel.deleteOne({ id });
    return result.deletedCount === 1;
  }
}
