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
import { EditRating, GetRatingsParam } from './rating/models';
import { RatingService } from './rating/rating.service';
import { UpdateGenreInput, UpdateUser } from './user/models';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly ratingService: RatingService,
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
  async updateUser(@Body() params: UpdateUser): Promise<User> {
    return this.userService.updateUser(params);
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
  async getUserRatings(@Body() params: GetRatingsParam): Promise<void> {
    this.ratingService.getUserRatings(params);
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
}
