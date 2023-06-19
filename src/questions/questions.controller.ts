import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Savollar amallari")
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: "Savol qo'shish" })
  @Post("add")
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @ApiOperation({ summary: "Barcha savollar" })
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha savollar" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @ApiOperation({ summary: "Savolni tahrirlash" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @ApiOperation({ summary: "Savolni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
