import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Card } from './cards.model';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create.card.dto';

@ApiTags("Cards")
@Controller('cards')
export class CardsController {
    constructor (private cardService : CardsService){}

    @ApiOperation({summary : 'Create new card'})
    @ApiResponse({status : 200, type : Card})
    @Post()
    createCard(@Body() dto : CreateCardDto){
        return this.cardService.createCard(dto)
    }

    @ApiOperation({summary : 'get card by ID'})
    @ApiResponse({status : 200, type : Card})
    @Get('/:cardId')
    getByCard(@Param('cardId') cardId : number){
        return this.cardService.getByCard(cardId)
    }

    @ApiOperation({summary : 'edit card data'})
    @ApiResponse({status : 200, type : Card})
    @UseGuards(JwtAuthGuard)
    @Put('/:cardId')
    updateCard(@Param('cardId') cardId : number, @Body() dto : CreateCardDto){
        return this.cardService.updateCard(cardId, dto)
    }

    @ApiOperation({summary : 'delete one card'})
    @UseGuards(JwtAuthGuard)
    @Delete('/:cardId')
    deleteCard(@Param('cardId') cardId : number){
        return this.cardService.deleteCard(cardId)
    }

}
