import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { FollowUserParams, UserSimple } from './models/user-simple';

@Injectable()
export class SocialService {
  constructor(private readonly prisma: PrismaService) {}

  async followUser(params: FollowUserParams): Promise<void> {
    await this.prisma.social_relations.create({
      data: {
        followerIdUserId: params.followerId,
        followingIdUserId: params.followingId,
      },
    });
  }

  async getUserRelations(
    userId: number,
  ): Promise<{ following: UserSimple[]; followers: UserSimple[] }> {
    const following = await this.prisma.social_relations.findMany({
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

    const followers = await this.prisma.social_relations.findMany({
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

  async unfollowUser(params: Prisma.social_relationsWhereInput): Promise<void> {
    try {
      await this.prisma.social_relations.deleteMany({
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
