import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserSimple } from './models/user-simple';

@Injectable()
export class SocialService {
  constructor(private readonly prisma: PrismaClient) {}

  async followUser(params: Prisma.SocialRelationsCreateInput) {
    return this.prisma.socialRelations.create({ data: params });
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
          },
        },
      },
    });

    const followingUsers: UserSimple[] = following.map((e) => ({
      ...e.followingId,
    }));
    const followerUsers: UserSimple[] = followers.map((e) => ({
      ...e.followerId,
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
