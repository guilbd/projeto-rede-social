import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Prisma, Tweet } from '.prisma/client';

@Injectable()
export class TweetsService {
  constructor(private db: PrismaService) {}

  async createTweet(data: CreateTweetDto): Promise<Tweet> {
    return this.db.tweet.create({ data });
  }

  async removeTweet(where: Prisma.TweetWhereUniqueInput): Promise<Tweet> {
    return this.db.tweet.delete({
      where,
    });
  }
}
