import { IsOptional, IsString } from 'class-validator';

export class CreateCitiesDTO {
  @IsString()
  city: string;

  @IsString()
  date: string;
}

export class UpdateCitiesDTO {
  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  date: string;
}

export class CityFactory {
  constructor(public id: string, public city: string, public date: string) {}
}
