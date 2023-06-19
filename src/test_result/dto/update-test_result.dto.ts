import { PartialType } from '@nestjs/swagger';
import { CreateTestResultDto } from './create-test_result.dto';

export class UpdateTestResultDto extends PartialType(CreateTestResultDto) {}
