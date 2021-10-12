import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from '.prisma/client';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  async dislike(id: number, userId: number): Promise<Like> {
    const userLike = await this.db.like.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (!userLike) {
      throw new NotFoundException('Tweet não localizado');
    }

    if (userLike.userId !== userId) {
      throw new UnauthorizedException('Você não possui permissão');
    }

    return this.db.like.delete({
      where: { id },
    });
  }
}
