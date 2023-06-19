import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './schemas/subject.schema';
import { Model } from 'mongoose';

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject.name) private subjectModel: Model<Subject>) { }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const newSubject = await new this.subjectModel(createSubjectDto);
    return newSubject.save();
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectModel.find().exec();
  }

  async findOne(id: string): Promise<Subject> {
    const existingSubject = await this.subjectModel.findById(id).exec();
    if (!existingSubject) {
      throw new NotFoundException("Ushbu fan topilmadi");
    }
    return existingSubject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    return await this.subjectModel.findByIdAndUpdate(id, updateSubjectDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Subject> {
    const deletedSubject = await this.subjectModel.findByIdAndDelete(id);
    if (!deletedSubject) {
      throw new NotFoundException(`Ushbu fan topilmadi`);
    }
    return deletedSubject;
  }
}
