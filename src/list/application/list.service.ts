import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ListRepository } from '../infrastructure/list.repository';
import {
  CreateListDTO,
  ListFactory,
  UpdateListDTO,
} from '../domain/dto/list.dto';

@Injectable()
export class ListService {
  constructor(private listRepository: ListRepository) {}
  async createList(model: CreateListDTO) {
    const list = new ListFactory(
      randomUUID(),
      model.shortName,
      model.longName,
      model.color,
      model.cities,
    );
    return await this.listRepository.create(list);
  }
  async updateList(id: string, model: UpdateListDTO) {
    return this.listRepository.update(id, model);
  }
  async deleteList(id: string) {
    return this.listRepository.delete(id);
  }
}
