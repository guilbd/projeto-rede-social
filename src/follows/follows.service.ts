import { Follow, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@Injectable()
export class FollowsService {
  constructor(private db: PrismaService) {}

  async follow(data: CreateFollowDto): Promise<Follow> {
    return this.db.follow.create({ data });
  }

  async unfollow(where: Prisma.FollowWhereUniqueInput): Promise<Follow> {
    return this.db.follow.delete({
      where,
    });
  }
}
