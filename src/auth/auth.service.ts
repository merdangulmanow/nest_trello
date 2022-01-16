import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create.user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { throws } from 'assert';

@Injectable()
export class AuthService {

    constructor(private userService : UsersService, 
                private jwtService : JwtService ){}

    async login(dto :CreateUserDTO){
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

    async registration(dto : CreateUserDTO){
        const condidate = await this.userService.getUsersByEmail(dto.email);
        if(condidate){
            throw new HttpException("this email is already exists", HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(dto.password, 4)
        const user = await this.userService.createUser({...dto, password : hashPassword})

        return this.generateToken(user)
    }

    private async generateToken(user : User) {
        const payload = {email : user.email, id : user.id}
        return { token : this.jwtService.sign(payload) }
    }

    private async validateUser(userDto : CreateUserDTO){
        const user = await this.userService.getUsersByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message : 'Wrong data'})
    }



}
