import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestGroupService } from './test-group.service';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Testlar amallari")
@Controller('tests')
export class TestGroupController {
  constructor(private readonly testGroupService: TestGroupService) {}

  @ApiOperation({ summary: "Test qo'shish" })
  @Post("add")
  create(@Body() createTestGroupDto: CreateTestGroupDto) {
    return this.testGroupService.create(createTestGroupDto);
  }

  @ApiOperation({ summary: "Barcha testlar" })
  @Get()
  findAll() {
    return this.testGroupService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha testlar" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testGroupService.findOne(id);
  }

  @ApiOperation({ summary: "Testni tahrirlash" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestGroupDto: UpdateTestGroupDto) {
    return this.testGroupService.update(id, updateTestGroupDto);
  }

  @ApiOperation({ summary: "Testni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testGroupService.remove(id);
  }
}
