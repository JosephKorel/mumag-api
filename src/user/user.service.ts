import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateGenreInput, UpdateUser } from './models';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async insertUser(params: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: params,
    });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        avatarUrl: true,
        genres: true,
        id: true,
        backgroundUrl: true,
        name: true,
        lastUpdatedAt: true,
        ratings: true,
      },
    });

    return user;
  }

  async getUser(params: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: params.email },
      select: {
        email: true,
        avatarUrl: true,
        genres: true,
        id: true,
        backgroundUrl: true,
        name: true,
        lastUpdatedAt: true,
        ratings: true,
      },
    });

    return user;
  }

  async updateUser(params: UpdateUser): Promise<User> {
    const lastUpdatedAt = new Date(
      params.params.lastUpdatedAt as string,
    ).toISOString();

    const user = await this.prisma.user.update({
      where: { id: params.id },
      data: { ...params.params, lastUpdatedAt },
      select: {
        email: true,
        avatarUrl: true,
        genres: true,
        id: true,
        backgroundUrl: true,
        name: true,
        lastUpdatedAt: true,
        ratings: true,
      },
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
