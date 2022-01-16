import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import { Model } from 'sequelize-typescript'
import { Card } from "src/cards/cards.model";
import { User } from "src/users/users.model";

interface ListCreateAttributes {
    name : string;
    userId : number;
}

@Table({tableName : "lists"})
export class List extends Model<List, ListCreateAttributes>{
    @ApiProperty({example : "1", description : "Identificator"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number

    @ApiProperty({example : "To do list", description : "name of list"})
    @Column({type : DataType.TEXT, unique : true, allowNull : false})
    name : string

    @ApiProperty({example : "1", description : "owner of list"})
    @ForeignKey(()=>User)
    @Column({type : DataType.INTEGER})
    userId : number

    @BelongsTo( ()=>User )
    user : User

    @HasMany( ()=> Card)
    cards : Card[]


}