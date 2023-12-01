import { Injectable } from '@nestjs/common';
import { Prisma, Score } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

export interface EditScore extends Prisma.ScoreUpdateInput {
  scoreId: number;
}

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  async addScore(params: Prisma.ScoreCreateInput): Promise<Score> {
    return this.prisma.score.create({ data: params });
  }

  async editScore(params: EditScore): Promise<void> {
    this.prisma.score.update({
      where: { id: params.scoreId },
      data: { score: params.score },
    });
  }

  async deleteScore(params: Prisma.ScoreWhereUniqueInput): Promise<Score> {
    return this.prisma.score.delete({ where: { id: params.id } });
  }
}
