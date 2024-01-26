import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  BaseSuggestion,
  InsertSuggestionParams,
  UpdateSuggestionParams,
  UserSuggestions,
} from './models';

@Injectable()
export class SuggestionService {
  constructor(private prisma: PrismaService) {}

  async insertSuggestion(params: InsertSuggestionParams): Promise<void> {
    await this.prisma.suggestion.create({
      data: {
        spotifyId: params.spotifyId,
        suggestedByUserId: params.suggestedBy,
        suggestedToUserId: params.suggestedTo,
        type: params.type,
      },
    });
  }

  async insertManySuggestions(params: InsertSuggestionParams[]): Promise<void> {
    await this.prisma.suggestion.createMany({
      data: params.map((e) => ({
        spotifyId: e.spotifyId,
        suggestedByUserId: e.suggestedBy,
        suggestedToUserId: e.suggestedTo,
        type: e.type,
      })),
    });
  }

  async updateSuggestion(
    params: UpdateSuggestionParams,
  ): Promise<Record<string, unknown>> {
    const onUpdate = await this.prisma.suggestion.update({
      where: { id: params.suggestionId },
      data: { rating: params.rating },
      select: { rating: true },
    });

    return onUpdate;
  }

  async deleteSuggestion(suggestionId: number): Promise<void> {
    await this.prisma.suggestion.delete({
      where: { id: suggestionId },
    });
  }

  async getUserSuggestions(userId: number): Promise<BaseSuggestion[]> {
    const fetchSuggestions = await this.prisma.suggestion.findMany({
      where: { suggestedByUserId: userId },
      select: {
        id: true,
        rating: true,
        type: true,
        spotifyId: true,
        createdAt: true,
        suggestedTo: { select: { name: true, id: true } },
      },
    });

    return fetchSuggestions.map<UserSuggestions>((e) => ({
      id: e.id,
      spotifyId: e.spotifyId,
      type: e.type,
      rating: e.rating,
      suggester: { name: e.suggestedTo.name, id: e.suggestedTo.id },
      createdAt: e.createdAt,
    }));
  }

  async getUserReceivedSuggestions(userId: number): Promise<BaseSuggestion[]> {
    const fetchSuggestions = await this.prisma.suggestion.findMany({
      where: { suggestedToUserId: userId },
      select: {
        id: true,
        rating: true,
        type: true,
        spotifyId: true,
        createdAt: true,
        suggestedBy: { select: { name: true, id: true } },
      },
    });

    return fetchSuggestions.map<UserSuggestions>((e) => ({
      id: e.id,
      spotifyId: e.spotifyId,
      type: e.type,
      rating: e.rating,
      suggester: { name: e.suggestedBy.name, id: e.suggestedBy.id },
      createdAt: e.createdAt,
    }));
  }
}
