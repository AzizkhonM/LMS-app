import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './schemas/answer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<Answer>) { }
  
  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const newAnswer = await new this.answerModel(createAnswerDto);
    return newAnswer.save();
  }

  async findAll(): Promise<Answer[]> {
    return await this.answerModel.find().populate("question_id").exec();
  }

  async findOne(id: string): Promise<Answer> {
    const existingAnswer = await this.answerModel.findById(id).populate("question_id").exec();
    if (!existingAnswer) {
      throw new NotFoundException("Ushbu javob topilmadi");
    }
    return existingAnswer;
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    return await this.answerModel.findByIdAndUpdate(id, updateAnswerDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Answer> {
    const deletedAnswer = await this.answerModel.findByIdAndDelete(id);
    if (!deletedAnswer) {
      throw new NotFoundException(`Ushbu javob topilmadi`);
    }
    return deletedAnswer;
  }
}
