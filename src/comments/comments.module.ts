import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from '../cards/cards.model';
import { User } from '../users/users.model';
import { Comments } from './comments.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports : [
    SequelizeModule.forFeature([Card, User, Comments]),
    JwtModule.register({
      secret : String(process.env.PRIVATE_KEY),
      signOptions : {
        expiresIn : '24h'
      }
    })
  ]
})
export class CommentsModule {}
