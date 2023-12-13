import { Injectable } from '@nestjs/common';
import { Prisma, Rating } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { EditRating, GetAllRatingsParam, GetRatingsParam } from './models';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async addRating(params: Prisma.RatingCreateInput): Promise<Rating> {
    return this.prisma.rating.create({ data: params });
  }

  async getUserRatings(
    params: GetRatingsParam,
  ): Promise<Record<string, unknown>> {
    const ratings = await this.prisma.rating.findMany({
      where: { authorId: params.userId },
    });

    return { ratings };
  }

  async getRatings(
    params: GetAllRatingsParam,
  ): Promise<Record<string, unknown>> {
    const ratings = await this.prisma.rating.findMany({
      where: { spotifyId: params.spotifyId },
    });

    return { ratings };
  }

  async editRating(params: EditRating): Promise<void> {
    this.prisma.rating.update({
      where: { id: params.ratingId },
      data: { rating: params.rating },
    });
  }

  async deleteRating(params: Prisma.RatingWhereUniqueInput): Promise<Rating> {
    return this.prisma.rating.delete({ where: { id: params.id } });
  }
}
