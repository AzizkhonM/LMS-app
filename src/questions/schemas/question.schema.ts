import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop()
  id: string;

  @Prop()
  question_title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "TestGroup" })
  test_group_id: string

  @Prop()
  has_many_answers: boolean
}

export const QuestionSchema = SchemaFactory.createForClass(Question);