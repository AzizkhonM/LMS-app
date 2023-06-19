import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Javoblar amallari")
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @ApiOperation({ summary: "Javob qo'shish" })
  @Post("add")
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @ApiOperation({ summary: "Barcha javoblar" })
  @Get()
  findAll() {
    return this.answersService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha javoblar" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(id);
  }

  @ApiOperation({ summary: "Javobni tahrirlash" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(id, updateAnswerDto);
  }

  @ApiOperation({ summary: "Javobni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(id);
  }
}
