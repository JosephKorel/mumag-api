import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';
import { ScoreService } from './score/score.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, ScoreService],
})
export class AppModule {}
