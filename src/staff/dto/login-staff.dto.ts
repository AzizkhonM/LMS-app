import { ApiProperty } from "@nestjs/swagger";

export class LoginStaffDto {

    @ApiProperty({ example: "Login", description: "Xodim logini" })
    login: string

    @ApiProperty({ example: "Password", description: "Parol" })
    password: string

}