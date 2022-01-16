import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Checklist } from 'src/checklist/checklist.model';
import { Comments } from 'src/comments/comments.model';
import { Card } from './cards.model';
import { CreateCardDto } from './dto/create.card.dto';

@Injectable()
export class CardsService {
    constructor(@InjectModel(Card) private cardRepository : typeof Card){}

    async createCard(dto : CreateCardDto){
        const card = await this.cardRepository.create(dto)
        return card
    }

    async getByCard(cardId : number){
        const card = await this.cardRepository.findOne({where : {id : cardId}, include : [{model : Checklist}, {model : Comments}]})
        return card
    }

    async updateCard(cardId : number, dto : CreateCardDto){
        const card = await this.cardRepository.findOne({where : {id : cardId}})
        if(!card){
            throw new HttpException('wrong data', HttpStatus.BAD_REQUEST)
        }
        await this.cardRepository.update({...dto}, {where : {id : cardId}})
        return dto
    }

    async deleteCard(cardId : number){
        const card = await this.cardRepository.findOne({where : {id : cardId}})
        if(!card){
            throw new HttpException('wrong data', HttpStatus.BAD_REQUEST)
        }
        await this.cardRepository.destroy({where : {id : cardId}})
        return card
    }
}
