import { Body, Controller, Post } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-likes.dto';
import { LikesService } from './likes.service';
import { Like } from '.prisma/client';

@Controller('likes')
export class LikesController {
  constructor(private db: LikesService) {}

  @Post('like')
  async createLike(@Body() data: CreateLikeDto): Promise<Like> {
    return this.db.createLike(data);
  }
}
