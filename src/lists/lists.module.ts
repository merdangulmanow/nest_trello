import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { List } from './list.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ListsService],
  controllers: [ListsController],
  imports : [
    SequelizeModule.forFeature([User, List]),
    JwtModule.register({
      secret : String(process.env.PRIVATE_KEY),
      signOptions : {
        expiresIn : '24h'
      }
    })
  ]
})
export class ListsModule {}
