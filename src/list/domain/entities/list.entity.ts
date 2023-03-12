import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ListDocument = HydratedDocument<List>;

@Schema()
export class List {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  shortName: string;

  @Prop({ required: true })
  longName: string;

  @Prop({ required: true })
  color: string;

  @Prop({ type: Array })
  cities: string;
}

export const ListSchema = SchemaFactory.createForClass(List);
