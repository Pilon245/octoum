import { IsOptional, IsString, Length } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateCitiesDTO {
  @Length(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  city: string;

  @Length(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  date: string;
}

export class UpdateCitiesDTO {
  @Length(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsOptional()
  city: string;

  @Length(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsOptional()
  date: string;
}

export class CityFactory {
  constructor(public id: string, public city: string, public date: string) {}
}
