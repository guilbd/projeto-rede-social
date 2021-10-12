import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('tweets')
export class TweetsController {
  constructor(private db: TweetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Post('create-post')
  async create(@Body() text: CreateTweetDto, @Req() Req): Promise<Tweet> {
    const user = Req.user.id;
    return this.db.createTweet(text, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Delete('del-tweet/:id')
  async removeTweet(
    @Param('id', ParseIntPipe) id: number,
    @Req() Req,
  ): Promise<Tweet> {
    const tweetId = Req.user.id;

    return this.db.removeTweet(id, tweetId);
  }
}
