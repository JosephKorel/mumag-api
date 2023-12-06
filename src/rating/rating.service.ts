import { Injectable } from '@nestjs/common';
import { Prisma, Rating } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { EditRating, GetRatingsParam } from './models';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async addRating(params: Prisma.RatingCreateInput): Promise<Rating> {
    return this.prisma.rating.create({ data: params });
  }

  async getUserRatings(params: GetRatingsParam): Promise<void> {
    this.prisma.rating.findMany({
      where: { authorId: params.userId },
    });
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
