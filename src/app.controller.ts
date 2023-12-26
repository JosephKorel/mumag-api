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
import {
  DeleteSuggestionParams,
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
  ) {}

  // User
  @Post('user')
  async insertUser(@Body() insertData: Prisma.UserCreateInput): Promise<User> {
    return this.userService.insertUser(insertData);
  }

  @Get('user')
  async getUser(@Query() params: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.userService.getUser(params);
  }

  @Put('user')
  async updateUser(@Body() params: UpdateUser): Promise<User | unknown> {
    console.log('IM COMING HERE');
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
  @Post('suggestion')
  async insertSuggestion(
    @Body() params: Prisma.SuggestionCreateInput,
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
}
