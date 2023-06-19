import { BadGatewayException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './schemas/student.schema';
import { Model } from 'mongoose';
import { LoginStudentDto } from './dto/login_student.dto';
import { Response } from 'express';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>, private readonly jwtService: JwtService) { }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    let candid = await this.studentModel.findOne({ login: createStudentDto.login }).exec()
    
    if(candid){
      throw new BadGatewayException("Ushbu username band")
    }
    const newStudent = await new this.studentModel(createStudentDto);    
    
    const hashed_password = await bcrypt.hash(createStudentDto.password, 7)

    newStudent.save();
    newStudent.hashed_password = hashed_password

    return await this.studentModel.findByIdAndUpdate(newStudent.id, newStudent).exec()
  }

  async login(loginStudentDto: LoginStudentDto, res: Response) {

    let candid = await this.studentModel.find({ login: loginStudentDto.login }).exec()
    console.log(candid);
    
    if(!candid){
      throw new UnauthorizedException("Bunday foydalanuvchi tizimda mavjud emas!")
    }

    const isPassCorrect = await bcrypt.compare(loginStudentDto.password, candid[0].hashed_password)
    if(!isPassCorrect){
      throw new UnauthorizedException("Parol noto'g'ri")
    }

    /* return "Salom" */

    const tokens = await this.getTokens(candid)

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updatedStudent = await this.studentModel.findByIdAndUpdate(candid[0]._id, { hashed_refresh_token: hashed_token }, { new: true }).exec()

    res.cookie("refresh_token", tokens.access_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true 
    })

    return {
      message: "Tizimga muvaffaqiyatli kirdingiz",
      Student: updatedStudent,
      tokens
    }
  }

  async findAll(): Promise<Student[]> {
    return await this.studentModel.find().populate("group_id").exec();
  }

  async findOne(id: string): Promise<Student> {
    const existingStudent = await this.studentModel.findById(id).populate("group_id").exec();
    if (!existingStudent) {
      throw new NotFoundException("Ushbu talaba topilmadi");
    }
    return existingStudent;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    return await this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Student> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id);
    if (!deletedStudent) {
      throw new NotFoundException(`Ushbu talaba topilmadi`);
    }
    return deletedStudent;
  }

  async getTokens(student) {
    const jwtPayload = {
      id: student.id,
      first_name: student.first_name
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.PRIVATE_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.PRIVATE_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }
}