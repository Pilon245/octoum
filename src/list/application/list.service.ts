import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CitiesRepository } from '../infrastructure/cities.repository';
import {
  CityFactory,
  CreateCitiesDTO,
  UpdateCitiesDTO,
} from '../domain/dto/cities.dto';
import { CitiesQueryRepository } from '../infrastructure/cities.query.repository';

@Injectable()
export class CitiesService {
  constructor(private citiesRepository: CitiesRepository) {}
  async createCity(model: CreateCitiesDTO) {
    const foundCity = await this.citiesRepository.findByName(model.city);
    if (foundCity) throw new BadRequestException('City is Created');
    const city = new CityFactory(randomUUID(), model.city, model.date);
    return await this.citiesRepository.create(city);
  }
  async updateCity(id: string, model: UpdateCitiesDTO) {
    return this.citiesRepository.update(id, model);
  }
  async deleteCity(id: string) {
    return this.citiesRepository.delete(id);
  }
}
