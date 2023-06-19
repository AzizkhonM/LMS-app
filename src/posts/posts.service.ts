import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) { }
 
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = await new this.postModel(createPostDto);
    return newPost.save();
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    const existingPost = await this.postModel.findById(id).exec();
    if (!existingPost) {
      throw new NotFoundException("Ushbu lavozim topilmadi");
    }
    return existingPost;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Post> {
    const deletedPost = await this.postModel.findByIdAndDelete(id);
    if (!deletedPost) {
      throw new NotFoundException(`Ushbu lavozim topilmadi`);
    }
    return deletedPost;
  }
}
