import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TestGroupDocument = HydratedDocument<TestGroup>;

@Schema()
export class TestGroup {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Subject" })
  subject_id: string

  @Prop()
  questions: number

  @Prop()
  time: number
}

export const TestGroupSchema = SchemaFactory.createForClass(TestGroup);