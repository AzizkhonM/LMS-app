import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type StaffDocument = HydratedDocument<Staff>;

@Schema()
export class Staff {
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

  @Prop({ unique: true })
  phone_number: string;

  @Prop({ unique: true })
  telegram_username: string;

  @Prop({ unique: true })
  login: string;

  @Prop()
  hashed_password: string;

  @Prop()
  hashed_refresh_token: string;

}

export const StaffSchema = SchemaFactory.createForClass(Staff);