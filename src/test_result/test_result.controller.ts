import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestResultService } from './test_result.service';
import { CreateTestResultDto } from './dto/create-test_result.dto';
import { UpdateTestResultDto } from './dto/update-test_result.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Natijalar amallari")
@Controller('results')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  @ApiOperation({ summary: "Natija qo'shish" })
  @Post()
  create(@Body() createTestResultDto: CreateTestResultDto) {
    return this.testResultService.create(createTestResultDto);
  }

  @ApiOperation({ summary: "Barcha natijalar" })
  @Get()
  findAll() {
    return this.testResultService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha natijalar" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testResultService.findOne(id);
  }

  @ApiOperation({ summary: "Natijani tahrirlash" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestResultDto: UpdateTestResultDto) {
    return this.testResultService.update(id, updateTestResultDto);
  }

  @ApiOperation({ summary: "Natijani o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testResultService.remove(id);
  }
}
