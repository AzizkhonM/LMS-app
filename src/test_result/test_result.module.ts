import { Module } from '@nestjs/common';
import { TestResultService } from './test_result.service';
import { TestResultController } from './test_result.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestResult, TestResultSchema } from './schemas/test_result.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TestResult.name, schema: TestResultSchema }])],
  controllers: [TestResultController],
  providers: [TestResultService]
})
export class TestResultModule {}
