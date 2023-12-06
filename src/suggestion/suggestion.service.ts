import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DeleteSuggestionParams, UpdateSuggestionParams } from './models';

@Injectable()
export class SuggestionService {
  constructor(private prisma: PrismaService) {}

  async insertSuggestion(params: Prisma.SuggestionCreateInput): Promise<void> {
    await this.prisma.suggestion.create({
      data: params,
    });
  }

  async updateSuggestion(params: UpdateSuggestionParams): Promise<void> {
    await this.prisma.suggestion.update({
      where: { id: params.suggestionId },
      data: { rating: params.rating },
    });
  }

  async deleteSuggestion(params: DeleteSuggestionParams): Promise<void> {
    await this.prisma.suggestion.delete({
      where: { id: params.suggestionId },
    });
  }
}
