import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { RatingService } from './rating/rating.service';
import { UserService } from './user/user.service';
import { SuggestionService } from './suggestion/suggestion.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, RatingService, SuggestionService],
})
export class AppModule {}
