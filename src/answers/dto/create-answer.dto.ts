import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateAnswerDto {

    @ApiProperty({ example: "Yakuniy", description: "Test nomi" })
    @IsString()
    readonly answer_title: string;

    @ApiProperty({ example: "1", description: "Fan ID si" })
    @IsBoolean()
    readonly is_true: boolean;

    @ApiProperty({ example: "30", description: "Savollar soni" })
    @IsString()
    readonly question_id: string;

}