import { Module } from '@nestjs/common';
import { TestGroupService } from './test-group.service';
import { TestGroupController } from './test-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestGroup, TestGroupSchema } from './schemas/test-group.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TestGroup.name, schema: TestGroupSchema }])],
  controllers: [TestGroupController],
  providers: [TestGroupService]
})
export class TestGroupModule {}
