import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTestGroupDto {

    @ApiProperty({ example: "Yakuniy", description: "Test nomi" })
    @IsString()
    readonly title: string;

    @ApiProperty({ example: "1", description: "Fan ID si" })
    @IsString()
    readonly subject_id: string;

    @ApiProperty({ example: "30", description: "Savollar soni" })
    @IsNumber()
    readonly questions: number;

    @ApiProperty({ example: "15", description: "Vaqt (daqiqa)" })
    @IsNumber()
    readonly time: number;

}