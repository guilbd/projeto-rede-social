import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { PrismaService } from './prisma.service';
import { FollowsModule } from './follows/follows.module';
import { LikesService } from './likes/likes.service';
import { LikesController } from './likes/likes.controller';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [AuthModule, UsersModule, TweetsModule, FollowsModule, LikesModule],
  controllers: [AppController, LikesController],
  providers: [AppService, PrismaService, LikesService],
})
export class AppModule {}
