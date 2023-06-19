import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff } from './schemas/staff.schema';
import { Response } from 'express';
import { LoginStaffDto } from './dto/login-staff.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StaffService {
  constructor(@InjectModel(Staff.name) private staffModel: Model<Staff>, private readonly jwtService: JwtService) { }

  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    const newStaff = await new this.staffModel(createStaffDto);
    return newStaff.save();
  }

  async login(loginStaffDto: LoginStaffDto, res: Response) {

    let candid = await this.staffModel.find({ login: loginStaffDto.login }).exec()
    console.log(candid);
    
    if(!candid){
      throw new UnauthorizedException("Bunday foydalanuvchi tizimda mavjud emas!")
    }

    const isPassCorrect = await bcrypt.compare(loginStaffDto.password, candid[0].hashed_password)
    if(!isPassCorrect){
      throw new UnauthorizedException("Parol noto'g'ri")
    }

    /* return "Salom" */

    const tokens = await this.getTokens(candid)

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updatedStudent = await this.staffModel.findByIdAndUpdate(candid[0]._id, { hashed_refresh_token: hashed_token }, { new: true }).exec()

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

  async findAll(): Promise<Staff[]> {
    return await this.staffModel.find().exec();
  }

  async findOne(id: string): Promise<Staff> {
    const existingStaff = await this.staffModel.findById(id).exec();
    if (!existingStaff) {
      throw new NotFoundException("Ushbu xodim topilmadi");
    }
    return existingStaff;
  }

  async update(id: string, updateStaffDto: UpdateStaffDto): Promise<Staff> {
    return await this.staffModel.findByIdAndUpdate(id, updateStaffDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Staff> {
    const deletedStaff = await this.staffModel.findByIdAndDelete(id);
    if (!deletedStaff) {
      throw new NotFoundException(`Ushbu xodim topilmadi`);
    }
    return deletedStaff;
  }

  async getTokens(staff: any) {
    const jwtPayload = {
      id: staff.id,
      first_name: staff.first_name
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
