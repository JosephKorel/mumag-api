import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { RatingService } from './rating/rating.service';
import { UserService } from './user/user.service';
import { SuggestionService } from './suggestion/suggestion.service';
import { SocialService } from './social/social.service';
import { SearchUsersService } from './search-users/search-users.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, RatingService, SuggestionService, SocialService, SearchUsersService],
})
export class AppModule {}
