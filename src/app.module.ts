import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { FollowsModule } from './follows/follows.module';
import { LikesController } from './likes/likes.controller';
import { LikesService } from './likes/likes.service';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [AuthModule, UsersModule, TweetsModule, FollowsModule, LikesModule],
  controllers: [AppController, LikesController],
  providers: [AppService, LikesService],
})
export class AppModule {}
