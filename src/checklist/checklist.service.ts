import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Checklist } from './checklist.model';
import { CreateChecklistDto } from './dto/create.checklist.dto';

@Injectable()
export class ChecklistService {

    constructor(@InjectModel(Checklist) private checklistRepository : typeof Checklist) {}

    async create(dto : CreateChecklistDto){
        const checklist = await this.checklistRepository.create(dto)
        return checklist
    }

    async update(id : number, dto : CreateChecklistDto){
        const checklist = await this.checklistRepository.findOne({where : {id}})
        if(!checklist){
            throw new HttpException('wrong data', HttpStatus.BAD_REQUEST)
        }

        await this.checklistRepository.update({...dto}, {where : {id}})
        return dto
    }

    async deleteChecklist(id : number){
        const checklist = await this.checklistRepository.findOne({where : {id}})
        if(!checklist){
            throw new HttpException('wrong data', HttpStatus.BAD_REQUEST)
        }

        await this.checklistRepository.destroy({where : {id}})
        return checklist
    }

    async getByID(id : number){
        const checklist = await this.checklistRepository.findOne({where : {id}})
        if(!checklist){
            throw new HttpException('wrong data', HttpStatus.BAD_REQUEST)
        }
        return checklist
    }

}