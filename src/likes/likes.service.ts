import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Like, prisma } from '.prisma/client';
import { CreateLikeDto } from './dto/create-likes.dto';

@Injectable()
export class LikesService {
  constructor(private db: PrismaService) {}

  async createLike(data: CreateLikeDto): Promise<Like> {
    const updateTweet = await this.db.like.create({
      data: {
        like: {
          increment: 1,
        },
      },
    });
    return updateTweet;
  }
}
