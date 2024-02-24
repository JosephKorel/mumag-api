import { Injectable } from '@nestjs/common';
import { Prisma, SavedSongs } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async createMany(params: Prisma.SavedSongsCreateInput[]): Promise<void> {
    try {
      await this.prisma.savedSongs.createMany({ data: params });
    } catch (error) {
      throw error;
    }
  }

  async findMany(userId: number, limit: number): Promise<SavedSongs[]> {
    try {
      const result = await this.prisma.savedSongs.findMany({
        where: { userId },
        select: {
          addedAt: true,
          album: true,
          artists: true,
          id: true,
          imageUrl: true,
          spotifyId: true,
          name: true,
          userId: true,
        },
        take: limit,
        orderBy: { addedAt: 'desc' },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
