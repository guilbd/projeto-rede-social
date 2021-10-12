import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from '.prisma/client';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TweetsService {
  constructor(private db: PrismaService) {}

  async createTweet(data: CreateTweetDto, user: number): Promise<Tweet> {
    return await this.db.tweet.create({
      data: {
        ...data,
        userId: user,
      },
    });
  }

  async getAll(): Promise<Tweet[]> {
    return this.db.tweet.findMany({
      include: {
        likes: {
          select: {
            userId: true,
          }
        },
        User: {
          select: {
            username: true,
          }
        }
      }
    })
  } 

  @UseGuards(AuthGuard('jwt'))
  async removeTweet(id: number, userId: number): Promise<Tweet> {
    const userTweet = await this.db.tweet.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (!userTweet) {
      throw new NotFoundException('Tweet não localizado');
    }

    if (userTweet.userId !== userId) {
      throw new UnauthorizedException('Você não possui permissão');
    }

    return this.db.tweet.delete({
      where: { id },
    });
  }
}
