import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Card } from "src/cards/cards.model";
import { User } from "src/users/users.model";

interface CommentsCreateAttributes {
    comment : string
}

@Table({tableName : 'comments'})
export class Comments extends Model <Comments, CommentsCreateAttributes> {
    @ApiProperty({example : '1', description : "Identificator"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : 'good job', description : "comment of user"})
    @Column({type : DataType.TEXT, allowNull : false})
    comment : string

    @ApiProperty({example : '1', description : "Identificator of card"})
    @ForeignKey( ()=> Card)
    @Column({type : DataType.INTEGER})
    cardId : number

    @BelongsTo( ()=> Card)
    card : Card

    @ApiProperty({example : '1', description : "Identificator of user"})
    @ForeignKey( ()=> User)
    @Column({type : DataType.INTEGER})
    userId : number

    @BelongsTo( ()=> User)
    user : User
}