import { ApiProperty } from "@nestjs/swagger";

export class LoginStudentDto {

    @ApiProperty({ example: "Login", description: "Talaba logini" })
    login: string

    @ApiProperty({ example: "Password", description: "Parol" })
    password: string

}