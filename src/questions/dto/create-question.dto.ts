import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";


export class CreateQuestionDto {

    @ApiProperty({ example: "2 + 2 necha?", description: "Savol" })
    @IsString()
    readonly question_title: string;

    @ApiProperty({ example: "1", description: "Test ID si" })
    @IsString()
    readonly test_group_id: string;

    @ApiProperty({ example: "true", description: "Test yoki test emasligi" })
    @IsBoolean()
    readonly has_many_answers: boolean;

}