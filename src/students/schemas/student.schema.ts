import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop()
  id: string;

  @Prop()
  first_name: string;

  @Prop()
  second_name: string;

  @Prop()
  patronymic: string;

  @Prop()
  avatar: string;

  @Prop()
  phone_number: string;

  @Prop()
  telegram_username: string;

  @Prop({unique: true})
  login: string;

  @Prop()
  hashed_password: string;

  @Prop()
  hashed_refresh_token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Group" })
  group_id: string

}

export const StudentSchema = SchemaFactory.createForClass(Student);