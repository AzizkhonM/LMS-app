import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTestResultDto {

    @ApiProperty({ example: "1", description: "Talaba ID si" })
    @IsString()
    readonly student_id: string;

    @ApiProperty({ example: "1", description: "Test ID si" })
    @IsString()
    readonly test_group_id: string;

    @ApiProperty({ example: "30", description: "To'g'ri javiblar" })
    @IsNumber()
    readonly correct_answers: number;

}