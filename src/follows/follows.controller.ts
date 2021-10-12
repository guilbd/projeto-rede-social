import { Follow } from '.prisma/client';
import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFollowDto } from './dto/create-follow.dto';
import { FollowsService } from './follows.service';
import { UseGuards } from '@nestjs/common';

@Controller('follows')
export class FollowsController {
  constructor(private db: FollowsService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Post('follow-user')
  async create(@Body() data: CreateFollowDto, @Req() Req): Promise<Follow> {
    const user = Req.user.id;
    return this.db.follow(data, user);
  }
  @UsePipes(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Delete('unfollow/:id')
  async unfollow(
    @Param('id', ParseIntPipe) id: number,
    @Req() Req,
  ): Promise<Follow> {
    const followId = Req.user.id;
    return this.db.unfollow(id, followId);
  }
}
