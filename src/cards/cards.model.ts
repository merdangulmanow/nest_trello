import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Table, Model, HasMany} from "sequelize-typescript";
import { Checklist } from "../checklist/checklist.model";
import { List } from "src/lists/list.model";
import { Comments } from "src/comments/comments.model";



interface CardCreateAttributes {
    value : string;
    description : string;
    deadline : Date;
    color : string;
}

@Table({tableName : 'cards'})
export class Card extends Model<Card, CardCreateAttributes>{
    @ApiProperty({example : "1", description : "Identificator"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : 'learn new things', description : "short description of card"})
    @Column({type : DataType.STRING, allowNull: false})
    value : string

    @ApiProperty({example : 'learn new things about sockets', description : "full description of card"})
    @Column({type:DataType.TEXT, allowNull : false, defaultValue : 'no-descreption'})
    description : string

    @ApiProperty({example : '20.01.2022', description : "deadline of this task"})
    @Column({type : DataType.DATE, allowNull : true})
    deadline : Date

    @ApiProperty({example : 'red', description : "color of card"})
    @Column({type : DataType.STRING, allowNull : false, defaultValue : 'no-color'})
    color : string

    @ApiProperty({example : 1, description : "owner of this card"})
    @ForeignKey( ()=>List)
    @Column({type : DataType.INTEGER})
    listId : number

    @BelongsTo( ()=> List)
    list : List

    @HasMany( ()=> Checklist)
    checklists : Checklist[]

    @HasMany( ()=> Comments)
    comments : Comments[]
}