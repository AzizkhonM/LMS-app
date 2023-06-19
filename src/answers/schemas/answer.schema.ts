import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema()
export class Answer {
  @Prop()
  id: string;

  @Prop()
  answer_title: string;

  @Prop()
  is_true: boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Question" })
  question_id: string
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);