import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from '.prisma/client';

@Injectable()
export class LikesService {
  constructor(private db: PrismaService) {}

  async createLike(data: CreateLikeDto, user: number): Promise<Like> {
    return await this.db.like.create({
      data: {
        ...data,
        userId: user,
      },
    });
  }
}
