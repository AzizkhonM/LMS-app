import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStudentDto {

    @ApiProperty({ example: "O'roqvoy", description: "Ism" })
    @IsString()
    readonly first_name: string;

    @ApiProperty({ example: "Boltaboyev", description: "Familiya" })
    @IsString()
    readonly second_name: string;

    @ApiProperty({ example: "Ketmonboyevich", description: "Otasining ismi" })
    @IsString()
    readonly patronymic: string;

    @ApiProperty({ example: "avatar.png", description: "Avatar linki" })
    @IsString()
    readonly avatar: string;

    @ApiProperty({ example: "901234567", description: "Telefon raqami" })
    @IsString()
    readonly phone_number: string;

    @ApiProperty({ example: "uroqvoy4567", description: "Telegram usernamei" })
    @IsString()
    readonly telegram_username: string;

    @ApiProperty({ example: "UroqvoyB", description: "Login" })
    @IsString()
    readonly login: string;

    @ApiProperty({ example: "Ur0qvoy_B", description: "Parol" })
    @IsString()
    readonly password: string;

    @ApiProperty({ example: "1", description: "Guruh ID si" })
    @IsString()
    readonly group_id: string;

}