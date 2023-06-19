import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TestGroup } from './schemas/test-group.schema';
import { Model } from 'mongoose';

@Injectable()
export class TestGroupService {
  constructor(@InjectModel(TestGroup.name) private testGroupModel: Model<TestGroup>) { }

  async create(createTestGroupDto: CreateTestGroupDto): Promise<TestGroup> {
    const newTestGroup = await new this.testGroupModel(createTestGroupDto);
    return newTestGroup.save();
  }

  async findAll(): Promise<TestGroup[]> {
    return await this.testGroupModel.find().populate("subject_id").exec();
  }

  async findOne(id: string): Promise<TestGroup> {
    const existingTestGroup = await this.testGroupModel.findById(id).populate("subject_id").exec();
    if (!existingTestGroup) {
      throw new NotFoundException("Ushbu test topilmadi");
    }
    return existingTestGroup;
  }

  async update(id: string, updateTestGroupDto: UpdateTestGroupDto): Promise<TestGroup> {
    return await this.testGroupModel.findByIdAndUpdate(id, updateTestGroupDto, { new: true }).exec();
  }

  async remove(id: string): Promise<TestGroup> {
    const deletedTestGroup = await this.testGroupModel.findByIdAndDelete(id);
    if (!deletedTestGroup) {
      throw new NotFoundException(`Ushbu test topilmadi`);
    }
    return deletedTestGroup;
  }
}
