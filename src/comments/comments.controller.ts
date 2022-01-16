import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Comments } from './comments.model';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create.comment.dto';

@ApiTags("Comments")
@Controller('comments')
export class CommentsController {

    constructor(private commentService : CommentsService){}

    @ApiOperation({summary : 'create comment'})
    @ApiResponse({status : 200, type : Comments})
    @UseGuards(JwtAuthGuard)
    @Post()
    createComment(@Body() dto: CreateCommentDto){
        return this.commentService.createComment(dto)
    }

    @ApiOperation({summary : 'delete comment'})
    @Delete('/:commentId')
    @UseGuards(JwtAuthGuard)
    deleteComment(@Param('commentId') commentId : number, @Request() req){
        const userId = req.user.id
        return this.commentService.deleteComment(commentId, userId)
    }

    @ApiOperation({summary : 'get comment by userID'})
    @ApiResponse({status : 200, type : Comments})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllComments(@Request() req) {
        const userId = req.user.id
        return this.commentService.getAllComments(userId)
    }



}