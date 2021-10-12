import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { PrismaService } from './prisma.service';
import { FollowsModule } from './follows/follows.module';

@Module({
  imports: [AuthModule, UsersModule, TweetsModule, FollowsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
