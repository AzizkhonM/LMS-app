import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePostDto {

    @ApiProperty({ example: "Dekan", description: "Lavozim" })
    @IsString()
    readonly title: string;

}