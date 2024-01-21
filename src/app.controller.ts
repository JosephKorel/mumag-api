import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import {
  EditRating,
  GetAllRatingsParam,
  GetRatingsParam,
} from './rating/models';
import { RatingService } from './rating/rating.service';
import { SearchUsersService } from './search-users/search-users.service';
import { FollowUserParams, UserSimple } from './social/models/user-simple';
import { SocialService } from './social/social.service';
import {
  DeleteSuggestionParams,
  InsertSuggestionParams,
  UpdateSuggestionParams,
} from './suggestion/models';
import { SuggestionService } from './suggestion/suggestion.service';
import { UpdateGenreInput, UpdateUser } from './user/models';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly ratingService: RatingService,
    private readonly suggestionService: SuggestionService,
    private readonly socialRelationsService: SocialService,
    private readonly searchUsers: SearchUsersService,
  ) {}

  // User
  @Post('user')
  async insertUser(@Body() insertData: Prisma.UserCreateInput): Promise<User> {
    return this.userService.insertUser(insertData);
  }

  @Get('search/user')
  async getUserById(@Query() params: Record<string, unknown>): Promise<User> {
    return this.userService.getUserById(Number(params['id']));
  }

  @Get('user')
  async getUser(@Query() params: Prisma.UserWhereUniqueInput): Promise<User> {
    console.log('IM COMING HERE');
    return this.userService.getUser(params);
  }

  @Put('user')
  async updateUser(@Body() params: UpdateUser): Promise<User | unknown> {
    try {
      return this.userService.updateUser(params);
    } catch (error) {
      return { error };
    }
  }

  @Put('user/update-genres')
  async updateGenres(
    @Body() params: UpdateGenreInput,
  ): Promise<Record<string, string>> {
    return this.userService.updateGenres(params);
  }

  // Rating
  @Post('rating')
  async addRating(@Body() params: Prisma.RatingCreateInput): Promise<void> {
    this.ratingService.addRating(params);
  }

  @Get('rating/user-ratings')
  async getUserRatings(
    @Body() params: GetRatingsParam,
  ): Promise<Record<string, unknown>> {
    return this.ratingService.getUserRatings(params);
  }

  @Get('rating')
  async getRatings(
    @Query() params: GetAllRatingsParam,
  ): Promise<Record<string, unknown>> {
    return this.ratingService.getRatings(params);
  }

  @Put('rating')
  async editRating(@Body() params: EditRating): Promise<void> {
    this.ratingService.editRating(params);
  }

  @Delete('rating')
  async deleteRating(
    @Body() params: Prisma.RatingWhereUniqueInput,
  ): Promise<void> {
    this.ratingService.deleteRating(params);
  }

  // Suggestion
  @Get('suggestion/sent-suggestions')
  async getUserSuggestions(
    @Body() params: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const data = await this.suggestionService.getUserSuggestions(
      params['userId'] as number,
    );
    return { data };
  }

  @Get('suggestion/received-suggestions')
  async getReceivedSuggestions(
    @Body() params: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const data = await this.suggestionService.getUserReceivedSuggestions(
      params['userId'] as number,
    );
    return { data };
  }

  @Post('suggestion')
  async insertSuggestion(
    @Body() params: InsertSuggestionParams,
  ): Promise<void> {
    return this.suggestionService.insertSuggestion(params);
  }

  @Put('suggestion')
  async updateSuggestion(
    @Body() params: UpdateSuggestionParams,
  ): Promise<Record<string, unknown>> {
    return this.suggestionService.updateSuggestion(params);
  }

  @Delete('suggestion')
  async deleteSuggestion(
    @Body() params: DeleteSuggestionParams,
  ): Promise<void> {
    return this.suggestionService.deleteSuggestion(params);
  }

  // Social Relations
  @Post('social/follow')
  async followUser(@Body() params: FollowUserParams): Promise<void> {
    return this.socialRelationsService.followUser(params);
  }

  @Get('social/relations')
  async getSocialRelations(@Query() data: Record<string, number>) {
    return this.socialRelationsService.getUserRelations(Number(data['userId']));
  }

  @Delete('social/unfollow')
  async unfollowUser(@Query() params: Prisma.SocialRelationsWhereInput) {
    return this.socialRelationsService.unfollowUser(params);
  }

  // Search Users
  @Get('search')
  async search(
    @Query() params: Record<string, unknown>,
  ): Promise<{ data: UserSimple[] }> {
    const result = await this.searchUsers.searchUser(
      params['name'] as string,
      Number(params['limit']),
    );

    return { data: result };
  }
}
