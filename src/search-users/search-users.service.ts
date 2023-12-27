import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserSimple } from '../social/models/user-simple';

@Injectable()
export class SearchUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUser(name: string): Promise<UserSimple[]> {
    return this.prisma.user.findMany({
      where: { name: { contains: name } },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
      },
    });
  }
}
