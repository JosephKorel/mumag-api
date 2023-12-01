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
import { EditScore, ScoreService } from './score/score.service';
import { UpdateGenreInput } from './user/models';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly scoreService: ScoreService,
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

  @Put('user/update-genres')
  async updateGenres(
    @Body() params: UpdateGenreInput,
  ): Promise<Record<string, string>> {
    return this.userService.updateGenres(params);
  }

  // Score
  @Post('score')
  async addScore(@Body() params: Prisma.ScoreCreateInput): Promise<void> {
    this.scoreService.addScore(params);
  }

  @Put('score')
  async editScore(@Body() params: EditScore): Promise<void> {
    this.scoreService.editScore(params);
  }

  @Delete('score')
  async deleteScore(
    @Body() params: Prisma.ScoreWhereUniqueInput,
  ): Promise<void> {
    this.scoreService.deleteScore(params);
  }
}
