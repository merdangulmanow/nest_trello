import { ApiProperty } from "@nestjs/swagger";
import { Length, IsBoolean, IsNumber } from "class-validator";

export class CreateChecklistDto {
    @ApiProperty({example : "find news about sockets", description : 'value of checklist'})
    @Length(10, 100)
    readonly value : string;

    @ApiProperty({example : 'true', description : "is this checklist item done"})
    @IsBoolean()
    readonly done : boolean;

    @ApiProperty({example : 1, description : "ID of card"})
    @IsNumber()
    readonly cardId : number
}