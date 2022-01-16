import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './cards.model';
import {Checklist} from '../checklist/checklist.model'
import { JwtModule } from '@nestjs/jwt';


@Module({
  providers: [CardsService],
  controllers: [CardsController],
  imports : [
    SequelizeModule.forFeature([Card, Checklist]),
    JwtModule.register({
      secret : String(process.env.PRIVATE_KEY),
      signOptions : {
        expiresIn : '24h'
      }
    })
  ],
})
export class CardsModule {}
