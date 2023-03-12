import { Controller, Delete, HttpCode } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from '../list/domain/entities/list.entity';
import { Model } from 'mongoose';
import { CitiesDocument, City } from '../cities/domain/entities/cities.entity';

@Controller()
export class DeleteController {
  constructor(
    @InjectModel(List.name) private listModel: Model<ListDocument>,
    @InjectModel(City.name) private cityModel: Model<CitiesDocument>,
  ) {}
  @HttpCode(204)
  @Delete('delete-all')
  async DeleteAll() {
    await this.cityModel.deleteMany();
    await this.listModel.deleteMany();
    return;
  }
}
