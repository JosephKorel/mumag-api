import { Prisma } from '@prisma/client';

export interface UpdateGenreInput {
  userId: number;
  genres: string;
}

export interface UpdateUser {
  id: number;
  params: Prisma.UserUpdateInput;
}
