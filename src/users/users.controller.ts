import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDTO } from './dto/create.user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService : UsersService) {}

    @ApiOperation({summary : "Create user"})
    @ApiResponse({status : 200, type : User})
    @Post()
    create(@Body() userDto : CreateUserDTO){
        try {
            return this.userService.createUser(userDto)
        } catch (error : any) {
            return {message : error.message}
        }
    }

    @ApiOperation({summary : "Getting all users"})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Req() req: any){
        return this.userService.getAllUsers()
    }
}