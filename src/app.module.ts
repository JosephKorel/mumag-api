import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { FavoriteService } from './favorite/favorite.service';
import { PrismaService } from './prisma.service';
import { RatingService } from './rating/rating.service';
import { SearchUsersService } from './search-users/search-users.service';
import { SocialService } from './social/social.service';
import { SuggestionService } from './suggestion/suggestion.service';
import { UserService } from './user/user.service';
import { FavoriteTitlesService } from './favorite-titles/favorite-titles.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    UserService,
    PrismaService,
    RatingService,
    SuggestionService,
    SocialService,
    SearchUsersService,
    FavoriteService,
    FavoriteTitlesService,
  ],
})
export class AppModule {}
