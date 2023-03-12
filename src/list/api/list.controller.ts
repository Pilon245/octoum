import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CitiesService } from '../application/cities.service';
import { CreateCitiesDTO, UpdateCitiesDTO } from '../domain/dto/cities.dto';
import { CitiesQueryRepository } from '../infrastructure/cities.query.repository';

@Controller('city')
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private citiesQueryRepository: CitiesQueryRepository,
  ) {}
  @Get()
  async findAll() {
    return this.citiesQueryRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id) {
    const found = await this.citiesQueryRepository.findById(id);
    if (!found) throw new BadRequestException('City is Not Found');
    return found;
  }

  @Post()
  async createCity(@Body() model: CreateCitiesDTO) {
    return this.citiesService.createCity(model);
  }
  @HttpCode(204)
  @Put(':id')
  async updateCity(@Param('id') id, @Body() model: UpdateCitiesDTO) {
    const result = await this.citiesService.updateCity(id, model);
    if (!result) {
      throw new HttpException('Incorrect Not Found', 404);
    }
    return result;
  }
  @HttpCode(204)
  @Delete(':id')
  async deleteCity(@Param('id') id) {
    const result = await this.citiesService.deleteCity(id);
    if (!result) {
      throw new HttpException('Incorrect Not Found', 404);
    }
    return result;
  }
}
