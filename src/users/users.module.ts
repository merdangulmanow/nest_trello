import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize"
import { User } from './users.model';
import { List } from 'src/lists/list.model';
import { AuthModule } from 'src/auth/auth.module';
import { Comments } from 'src/comments/comments.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports : [
    SequelizeModule.forFeature([User, List, Comments]),
    forwardRef( ()=> AuthModule)
  ],
  exports : [UsersService]
})
export class UsersModule {}