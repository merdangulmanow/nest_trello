import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from 'src/cards/cards.model';
import { User } from 'src/users/users.model';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './list.model';

@Injectable()
export class ListsService {

    constructor(@InjectModel(List) private listRepository : typeof List) {}

    async createList(dto : CreateListDto, userId : number){
        if(userId != dto.userId){
            throw new HttpException('invalid data', HttpStatus.BAD_REQUEST)
        }
        const list = await this.listRepository.create(dto)
        return list
    }

    async updateList (id : number, dto : CreateListDto, userId : number){
        const list = await this.listRepository.findOne({where : {id : id, userId : userId}})
        if(!list){
            throw new HttpException('wrong data', HttpStatus.BAD_REQUEST);
        }
        const data = await this.listRepository.update({name : dto.name}, {where:{id}})
        return dto
    }

    async getByParam(id : number, userId : number){

        const list = await this.listRepository.findOne({where : {id, userId}, include : [{model : Card}, {model : User} ] })
        return list
    }

    async deleteList(id : number, userId : number){
        const list = await this.listRepository.findOne({where : {id : id, userId : userId}})
        if(!list){
            throw new HttpException('wrong data', HttpStatus.BAD_REQUEST);
        }
        await this.listRepository.destroy({where : {id}})
        return {message : "deleted"}
    }

    

}