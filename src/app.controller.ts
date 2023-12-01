import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UpdateGenreInput } from './user/models';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

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
}
