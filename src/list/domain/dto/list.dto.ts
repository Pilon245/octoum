import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ListExistsRule } from '../cities-validation.service';

export enum ColorCity {
  green = 'Зелёный',
  black = 'Чёрный',
  blue = 'Синий',
  white = 'Белый',
}

export class CreateListDTO {
  @Length(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  shortName: string;

  @Length(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  longName: string;

  @Length(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEnum(ColorCity)
  color: ColorCity;

  @Validate(ListExistsRule)
  @IsArray()
  cities: Array<string>;
}

export class UpdateListDTO {
  @IsOptional()
  @Length(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  shortName: string;

  @IsOptional()
  @Length(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  longName: string;

  @IsOptional()
  @Length(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEnum(ColorCity)
  color: ColorCity;

  @IsOptional()
  @IsArray()
  @Validate(ListExistsRule)
  cities: Array<string>;
}

export class ListFactory {
  constructor(
    public id: string,
    public shortName: string,
    public longName: string,
    public color: string,
    public cities: Array<string>,
  ) {}
}
