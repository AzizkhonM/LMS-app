import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) { }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = await new this.groupModel(createGroupDto);
    return newGroup.save();
  }

  async findAll(): Promise<Group[]> {
    return await this.groupModel.find().populate("staff_id").exec();
  }

  async findOne(id: string): Promise<Group> {
    const existingGroup = await this.groupModel.findById(id).populate("staff_id").exec();
    if (!existingGroup) {
      throw new NotFoundException("Ushbu guruh topilmadi");
    }
    return existingGroup;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return await this.groupModel.findByIdAndUpdate(id, updateGroupDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Group> {
    const deletedGroup = await this.groupModel.findByIdAndDelete(id);
    if (!deletedGroup) {
      throw new NotFoundException(`Ushbu guruh topilmadi`);
    }
    return deletedGroup;
  }
}
