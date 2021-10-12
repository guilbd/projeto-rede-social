import {
  Controller,
  Post,
  Req,
  Body,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';
import { Like } from '.prisma/client';

@Controller('likes')
export class LikesController {
  constructor(private db: LikesService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Post('like')
  async like(@Body() data: CreateLikeDto, @Req() Req): Promise<Like> {
    const user = Req.user.id;
    return await this.db.createLike(data, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Delete('dislike/:id')
  async dislike(
    @Param('id', ParseIntPipe) id: number,
    @Req() Req,
  ): Promise<Like> {
    const likeId = Req.user.id;

    return this.db.dislike(id, likeId);
  }
}
