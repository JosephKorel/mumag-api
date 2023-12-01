import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateGenreInput } from './models';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async insertUser(params: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: { email: params.email, name: params.name },
    });
  }

  async getUser(params: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: params.email },
    });

    return user;
  }

  async updateGenres(
    params: UpdateGenreInput,
  ): Promise<Record<string, string>> {
    await this.prisma.user.update({
      where: { id: params.userId },
      data: { genres: params.genres },
    });

    return { genres: params.genres };
  }
}
