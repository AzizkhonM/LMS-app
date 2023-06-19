import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema()
export class Subject {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  image: string
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);