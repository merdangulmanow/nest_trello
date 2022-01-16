import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Length } from "class-validator";

export class CreateListDto{
    @ApiProperty({example : "to do list of monday", description : "name of list"})
    @Length(5, 15)
    readonly name : string;
    @ApiProperty({example : "1", description : "ID of user"})
    @IsNumber()
    readonly userId : number;
}