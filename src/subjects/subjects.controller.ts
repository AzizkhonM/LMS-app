import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Fanlar amallari")
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @ApiOperation({ summary: "Fan qo'shish" })
  @Post("add")
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @ApiOperation({ summary: "Barcha fanlar" })
  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha fanlar" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id);
  }

  @ApiOperation({ summary: "Fanni tahrirlash" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @ApiOperation({ summary: "Fanni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}
