import { Follow } from '.prisma/client';
import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {
  constructor(private db: FollowsService) {}

  @Post('follow-user')
  async create(@Body() data: CreateFollowDto): Promise<Follow> {
    return this.db.follow(data);
  }

  @Delete('unfollow/:id')
  async unfollow(@Param('id') id: number): Promise<Follow> {
    return this.db.unfollow({ id: Number(id) });
  }
}
