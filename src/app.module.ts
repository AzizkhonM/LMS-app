import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TestGroupModule } from './test-group/test-group.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { TestResultModule } from './test_result/test_result.module';
import { StudentsModule } from './students/students.module';
import { StaffModule } from './staff/staff.module';
import { GroupsModule } from './groups/groups.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }), MongooseModule.forRoot("mongodb+srv://Azizkhon:el4D1p7Z9l7rVsJZ@cluster0.vuc7hj4.mongodb.net/?retryWrites=true&w=majority"), PostsModule, SubjectsModule, TestGroupModule, QuestionsModule, AnswersModule, TestResultModule, StudentsModule, StaffModule, GroupsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

// password: el4D1p7Z9l7rVsJZ
// username: Azizkhon