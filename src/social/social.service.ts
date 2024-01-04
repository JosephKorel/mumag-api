import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UserSimple } from './models/user-simple';

@Injectable()
export class SocialService {
  constructor(private readonly prisma: PrismaService) {}

  async followUser(params: Prisma.SocialRelationsCreateInput): Promise<void> {
    await this.prisma.socialRelations.create({ data: params });
  }

  async getUserRelations(
    userId: number,
  ): Promise<{ following: UserSimple[]; followers: UserSimple[] }> {
    const following = await this.prisma.socialRelations.findMany({
      where: { followerId: { id: userId } },
      select: {
        followingId: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            genres: true,
          },
        },
      },
    });

    const followers = await this.prisma.socialRelations.findMany({
      where: { followingId: { id: userId } },
      select: {
        followerId: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            genres: true,
          },
        },
      },
    });

    const followingUsers: UserSimple[] = following.map((e) => ({
      ...e.followingId,
      genres: e.followingId.genres.split(','),
    }));

    const followerUsers: UserSimple[] = followers.map((e) => ({
      ...e.followerId,
      genres: e.followerId.genres.split(','),
    }));

    return { following: followingUsers, followers: followerUsers };
  }

  async unfollowUser(params: Prisma.SocialRelationsWhereInput): Promise<void> {
    try {
      await this.prisma.socialRelations.deleteMany({
        where: {
          followerIdUserId: params.followerIdUserId,
          followingIdUserId: params.followingIdUserId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
