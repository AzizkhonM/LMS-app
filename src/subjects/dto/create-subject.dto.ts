import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSubjectDto {

    @ApiProperty({ example: "Matematika", description: "Fan" })
    @IsString()
    readonly title: string;

    @ApiProperty({ example: "math.png", description: "Rasm" })
    @IsString()
    readonly image: string;

}