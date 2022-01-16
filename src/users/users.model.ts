import { ApiProperty } from "@nestjs/swagger";
import {Model, Table, Column, DataType, HasMany} from "sequelize-typescript"
import { Comments } from "../comments/comments.model";
import { List } from "src/lists/list.model";

interface UserCreationAttributes {
    email : string,
    password : string,
}

@Table({tableName : "users"})
export class User extends Model<User, UserCreationAttributes>{
    @ApiProperty({example : '1', description : "Identificator"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example: "user@gmail.com", description : "email address"})
    @Column({type: DataType.STRING, unique : true, allowNull : false})
    email : string

    @ApiProperty({example : "secretPassword", description : "Password"})
    @Column({type : DataType.STRING, allowNull : false})
    password : string;

    @HasMany( ()=>List )
    lists : List[]

    @HasMany( ()=>Comments)
    comments : Comment[]
}