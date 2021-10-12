import { Controller, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from '.prisma/client';

@Controller('tweets')
export class TweetsController {
  constructor(private db: TweetsService) {}

  @Post('create-post')
  async create(@Body() data: CreateTweetDto): Promise<Tweet> {
    return this.db.createTweet(data);
  }

  @Delete('del-tweet/:id')
  async removeTweet(@Param('id') id: number): Promise<Tweet> {
    return this.db.removeTweet({ id: Number(id) });
  }
}
