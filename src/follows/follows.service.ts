import { Follow } from '.prisma/client';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FollowsService {
  constructor(private db: PrismaService) {}

  async follow(data: CreateFollowDto, user: number): Promise<Follow> {
    return await this.db.follow.create({
      data: {
        ...data,
        userId: user,
      },
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  async unfollow(id: number, userId: number): Promise<Follow> {
    const userFollow = await this.db.follow.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (!userFollow) {
      throw new NotFoundException('Tweet não localizado');
    }

    if (userFollow.userId !== userId) {
      throw new UnauthorizedException('Você não possui permissão');
    }

    return this.db.follow.delete({
      where: { id },
    });
  }
}
