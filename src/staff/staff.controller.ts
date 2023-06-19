import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginStaffDto } from './dto/login-staff.dto';
import { Response } from 'express';

@ApiTags("Xodimlar amallari")
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: "Xodim qo'shish" })
  @Post("add")
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @Post("login")
  login(@Body() loginStaffDto: LoginStaffDto, @Res({ passthrough: true }) res: Response) {
    return this.staffService.login(loginStaffDto, res)
  }

  @ApiOperation({ summary: "Barcha xodimlar" })
  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha xodimlar" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @ApiOperation({ summary: "Xodimni tahrirlash" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(id, updateStaffDto);
  }

  @ApiOperation({ summary: "Xodimni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
