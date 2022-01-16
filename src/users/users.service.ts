import { Injectable} from '@nestjs/common';
import { User } from './users.model';
import {InjectModel} from "@nestjs/sequelize";
import { CreateUserDTO } from './dto/create.user.dto';
import { List } from 'src/lists/list.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository : typeof User){}

    async createUser(dto : CreateUserDTO) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include : {model : List, /*attributes : ['id'] */ }});
        return users;
    }

    async getUsersByEmail(email : string){
        const user = await this.userRepository.findOne({where : {email}})
        return user
    }

}