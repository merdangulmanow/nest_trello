import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class CreateUserDTO {
    @ApiProperty({example: "user@gmail.com", description : "email address"})
    @IsEmail()
    readonly email : string;
    @ApiProperty({example : "secretPassword", description : "Password"})
    @Length(5, 20)
    readonly password : string
}