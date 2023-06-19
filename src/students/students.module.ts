import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]), JwtModule.register({})],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
