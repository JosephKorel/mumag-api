import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { RatingService } from './rating/rating.service';
import { SearchUsersService } from './search-users/search-users.service';
import { SocialService } from './social/social.service';
import { SuggestionService } from './suggestion/suggestion.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    UserService,
    PrismaService,
    RatingService,
    SuggestionService,
    SocialService,
    SearchUsersService,
  ],
})
export class AppModule {}
