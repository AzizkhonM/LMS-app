import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginStudentDto } from './dto/login_student.dto';
import { Response } from 'express';

@ApiTags("Talabalar amallari")
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: "Talaba qo'shish" })
  @Post("add")
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @Post("login")
  login(@Body() loginStudentDto: LoginStudentDto, @Res({ passthrough: true }) res: Response) {
    return this.studentsService.login(loginStudentDto, res)
  }

  @ApiOperation({ summary: "Barcha talabalar" })
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha talabalar" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @ApiOperation({ summary: "Talabani tahrirlash" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @ApiOperation({ summary: "Talabani o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
