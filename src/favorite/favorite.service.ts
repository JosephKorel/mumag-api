import { Injectable } from '@nestjs/common';
import { Prisma, saved_songs } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async createManySongs(
    params: Prisma.saved_songsCreateInput[],
  ): Promise<void> {
    try {
      await this.prisma.saved_songs.createMany({ data: params });
    } catch (error) {
      throw error;
    }
  }

  async findManySongs(userId: number, limit: number): Promise<saved_songs[]> {
    try {
      const result = await this.prisma.saved_songs.findMany({
        where: { userId },
        take: limit,
        orderBy: { index: 'desc' },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
