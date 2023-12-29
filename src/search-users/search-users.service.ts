import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserSimple } from '../social/models/user-simple';

@Injectable()
export class SearchUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUser(name: string, take: number): Promise<UserSimple[]> {
    const result = await this.prisma.user.findMany({
      where: { name: { contains: name } },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        genres: true,
      },
      take,
    });

    return result.map((e) => ({ ...e, genres: e.genres.split(',') }));
  }
}
