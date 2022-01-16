import { Module } from "@nestjs/common";    
import { SequelizeModule } from "@nestjs/sequelize"
import { UsersModule } from './users/users.module';
import {ConfigModule} from '@nestjs/config'
import { User } from "./users/users.model";
import { ListsModule } from './lists/lists.module';
import { List } from "./lists/list.model";
import { CardsModule } from './cards/cards.module';
import { Card } from "./cards/cards.model";
import { AuthModule } from './auth/auth.module';
import { ChecklistModule } from './checklist/checklist.module';
import { Checklist } from "./checklist/checklist.model";
import { CommentsModule } from './comments/comments.module';
import { Comments } from "./comments/comments.model";
@Module({
    controllers : [],
    providers : [],
    imports : [
        ConfigModule.forRoot({
            envFilePath : `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect : 'postgres',
            host : process.env.POSTGRES_HOST,
            port : Number(process.env.POSTGRES_PORT),
            username : process.env.POSTGRES_USER,
            password : process.env.POSTGRES_PASSWORD,
            database : process.env.POSTGRES_DB,
            models: [User, List, Card, Checklist, Comments],
            autoLoadModels : true,
        }),
        UsersModule,
        ListsModule,
        CardsModule,
        AuthModule,
        ChecklistModule,
        CommentsModule
    ]
})
export class AppModule{}