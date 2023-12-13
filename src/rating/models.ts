import { Prisma } from '@prisma/client';

export interface GetRatingsParam {
  userId: number;
}

export interface GetAllRatingsParam {
  spotifyId: string;
}

export interface EditRating extends Prisma.RatingUpdateInput {
  ratingId: number;
}
