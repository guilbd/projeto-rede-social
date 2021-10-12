import {
  Controller,
  Post,
  Req,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
}
