import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Checklist } from './checklist.model';
import { ChecklistService } from './checklist.service';
import { CreateChecklistDto } from './dto/create.checklist.dto';

@ApiTags('Checklists')
@Controller('checklist')
export class ChecklistController {

    constructor (private checklistService : ChecklistService) {}

    @ApiOperation({summary : 'create new checklist'})
    @ApiResponse({status : 200, type : Checklist})
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto : CreateChecklistDto){
        return this.checklistService.create(dto)
    }

    @ApiOperation({summary : 'edit checklist'})
    @ApiResponse({status : 200, type : Checklist})
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    update(@Param('id') id :number, @Body() dto : CreateChecklistDto){
        return this.checklistService.update(id, dto)
    }

    @ApiOperation({summary : 'delete checklist'})
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteChecklist(@Param('id') id : number){
        return this.checklistService.deleteChecklist(id)
    }

    @ApiOperation({summary : 'get checklist by ID'})
    @ApiResponse({status : 200, type : Checklist})
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getOneChecklist(@Param('id') id : number){
        return this.checklistService.getByID(id)
    }

}