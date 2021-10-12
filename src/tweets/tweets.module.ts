import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TweetsController],
  providers: [TweetsService, PrismaService],
})
export class TweetsModule {}
