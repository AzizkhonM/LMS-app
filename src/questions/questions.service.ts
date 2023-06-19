import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question.name) private questionModel: Model<Question>) { }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const newQuestion = await new this.questionModel(createQuestionDto);
    return newQuestion.save();
  }

  async findAll(): Promise<Question[]> {
    return await this.questionModel.find().populate("test_group_id").exec();
  }

  async findOne(id: string): Promise<Question> {
    const existingQuestion = await this.questionModel.findById(id).populate("test_group_id").exec();
    if (!existingQuestion) {
      throw new NotFoundException("Ushbu savol topilmadi");
    }
    return existingQuestion;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    return await this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Question> {
    const deletedQuestion = await this.questionModel.findByIdAndDelete(id);
    if (!deletedQuestion) {
      throw new NotFoundException(`Ushbu savol topilmadi`);
    }
    return deletedQuestion;
  }
}
