import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGroupDto {

    @ApiProperty({ example: "N7", description: "Guruh nomi" })
    @IsString()
    readonly title: string;

    @ApiProperty({ example: "1", description: "Xodim ID si" })
    @IsString()
    readonly staff_id: string;

}