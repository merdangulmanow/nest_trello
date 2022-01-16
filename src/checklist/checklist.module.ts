import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from '../cards/cards.model';
import { ChecklistController } from './checklist.controller';
import { Checklist } from './checklist.model';
import { ChecklistService } from './checklist.service';

@Module({
  controllers: [ChecklistController],
  providers: [ChecklistService],
  imports : [
    SequelizeModule.forFeature([Card, Checklist]),
    JwtModule.register({
      secret : String(process.env.PRIVATE_KEY),
      signOptions : {
        expiresIn : '24h'
      }
    })
  ]
})
export class ChecklistModule {}
