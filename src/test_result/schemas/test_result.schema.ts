import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TestResultDocument = HydratedDocument<TestResult>;

@Schema()
export class TestResult {
  @Prop()
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Student" })
  student_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "TestGroup" })
  test_group_id: string

  @Prop()
  correct_answers: number
}

export const TestResultSchema = SchemaFactory.createForClass(TestResult);