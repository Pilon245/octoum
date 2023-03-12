import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CitiesDocument = HydratedDocument<City>;

@Schema()
export class City {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  date: string;
}

export const CitiesSchema = SchemaFactory.createForClass(City);
