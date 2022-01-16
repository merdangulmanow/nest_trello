import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Length } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({example : 'this is my comment', description : "comments"})
    @Length(5, 100)
    readonly comment : string;

    @ApiProperty({example : 1, description : "ID of card"})
    @IsNumber()
    readonly cardId : number;

    @ApiProperty({example : 1, description : "ID of user"})
    @IsNumber()
    readonly userId : number;
}