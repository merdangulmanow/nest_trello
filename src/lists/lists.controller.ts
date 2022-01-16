import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './list.model';
import { ListsService } from './lists.service';

@ApiTags('Lists')
@Controller('lists')
export class ListsController {
    constructor (private listService : ListsService){}

    @ApiOperation({summary : "Creating list"})
    @ApiResponse({status : 200, type : List})
    @UseGuards(JwtAuthGuard)
    @Post()
    createList(@Body() dto : CreateListDto, @Request() req){
        const userId = req.user.id
        return this.listService.createList(dto, userId)
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    updateList(@Param('id') id : number, @Body() dto : CreateListDto, @Request() req){
        
        const userId = req.user.id
        return this.listService.updateList(id, dto, userId)
    }

    @ApiOperation({summary : "getting list by id"})
    @ApiResponse({status : 200, type : [List]})
    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getByParams(@Param('id') id : number, @Request() req){
        const userId = req.user.id
        return this.listService.getByParam(id, userId)
    }

    @ApiOperation({summary : 'delete one list'})
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteCard(@Param('id') id : number, @Request() req){
        const userId = req.user.id
        return this.listService.deleteList(id, userId)
    }

    
}