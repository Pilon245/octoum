import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CitiesQueryRepository } from '../../cities/infrastructure/cities.query.repository';

@ValidatorConstraint({ name: 'ListExists', async: true })
@Injectable()
export class ListExistsRule implements ValidatorConstraintInterface {
  constructor(private citiesQueryRepository: CitiesQueryRepository) {}
  async validate(value: Array<string>) {
    try {
      const error = await Promise.all(
        value.map(async (c) => {
          const result = await this.citiesQueryRepository.findByName(c);
          if (!result) return false;
          return true;
        }),
      );
      const test = error.filter((p) => p == false);
      if (test[0] === false) return false;
      return true;
    } catch (e) {
      return false;
    }

    // let errorID: number | undefined = undefined;
    // const arrPromise = model.dto_id.map(async ({ id }) => {
    //   const data = await this.orm.table.findOne({
    //     where: { id: BigInt(id) },
    //   });
    //   if (data === null) {
    //     errorID = id;
    //   }
    //   return data;
    // });
    //
    // await Promise.all(arrPromise);
    //
    // if (Number.isInteger(errorID)) {
    //   throw new BadRequestException(CATEGORY_NOT_FOUND);
    // }
  }
  defaultMessage(args: ValidationArguments) {
    return `Cities doesn't exist`;
  }
}
