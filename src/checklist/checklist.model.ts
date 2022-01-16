import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Card } from "src/cards/cards.model";

interface CheckListCreateAttributes {
    value : string;
    done : boolean;
}

@Table({tableName : "checklists"})
export class Checklist extends Model<Checklist, CheckListCreateAttributes> {
    @ApiProperty({example : '1', description : "Identificator"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : 'find news about sockets room', description : "value of checklist"})
    @Column({type : DataType.STRING, allowNull: false})
    value : string

    @ApiProperty({example : true, description : "is that checklist item done?"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    done: boolean;

    @ApiProperty({example : '1', description : "Identificator of card"})
    @ForeignKey( ()=> Card)
    @Column({type : DataType.INTEGER})
    cardId : number

    @BelongsTo( ()=> Card)
    card : Card
}