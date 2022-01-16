import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './comments.model';
import { CreateCommentDto } from './dto/create.comment.dto';

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comments) private commentRepository : typeof Comments){}

    async createComment(dto :CreateCommentDto){
        try {
            const comment = await this.commentRepository.create(dto)
            return comment
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteComment(commentId : number, userId : number) {
        try {
            const comment = await this.commentRepository.findOne({where: {id : commentId, userId : userId}})
            if(!comment){
                throw new HttpException("invalid data", HttpStatus.BAD_REQUEST)
            }
            await this.commentRepository.destroy({where : {id : commentId}})
            return {message : `deleted ${commentId}`}
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllComments(userId : number){
        const comments = await this.commentRepository.findAll({where : {userId}})
        return comments
    }



}