import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestResultDto } from './dto/create-test_result.dto';
import { UpdateTestResultDto } from './dto/update-test_result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TestResult } from './schemas/test_result.schema';
import { Model } from 'mongoose';

@Injectable()
export class TestResultService {
  constructor(@InjectModel(TestResult.name) private testResultModel: Model<TestResult>) { }

  async create(createTestResultDto: CreateTestResultDto): Promise<TestResult> {
    const newTestResult = await new this.testResultModel(createTestResultDto);
    return newTestResult.save();
  }

  async findAll(): Promise<TestResult[]> {
    return await this.testResultModel.find().populate("subject_id").exec();
  }

  async findOne(id: string): Promise<TestResult> {
    const existingTestResult = await this.testResultModel.findById(id).populate("subject_id").exec();
    if (!existingTestResult) {
      throw new NotFoundException("Ushbu natija topilmadi");
    }
    return existingTestResult;
  }

  async update(id: string, updateTestResultDto: UpdateTestResultDto): Promise<TestResult> {
    return await this.testResultModel.findByIdAndUpdate(id, updateTestResultDto, { new: true }).exec();
  }

  async remove(id: string): Promise<TestResult> {
    const deletedTestResult = await this.testResultModel.findByIdAndDelete(id);
    if (!deletedTestResult) {
      throw new NotFoundException(`Ushbu natija topilmadi`);
    }
    return deletedTestResult;
  }
}
