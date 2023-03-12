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
} from '@nestjs/common';
import { ListService } from '../application/list.service';
import { ListQueryRepository } from '../infrastructure/list.query.repository';
import { CreateListDTO, UpdateListDTO } from '../domain/dto/list.dto';

@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private listQueryRepository: ListQueryRepository,
  ) {}
  @Get()
  async findAll() {
    return this.listQueryRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id) {
    const found = await this.listQueryRepository.findById(id);
    if (!found) throw new BadRequestException('List is Not Found');
    return found;
  }

  @Post()
  async createList(@Body() model: CreateListDTO) {
    return this.listService.createList(model);
  }
  @HttpCode(204)
  @Put(':id')
  async updateList(@Param('id') id, @Body() model: UpdateListDTO) {
    const result = await this.listService.updateList(id, model);
    if (!result) {
      throw new HttpException('Incorrect Not Found', 404);
    }
    return result;
  }
  @HttpCode(204)
  @Delete(':id')
  async deleteList(@Param('id') id) {
    const result = await this.listService.deleteList(id);
    if (!result) {
      throw new HttpException('Incorrect Not Found', 404);
    }
    return result;
  }
}
