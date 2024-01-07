export interface UserSimple {
  id: number;
  name: string;
  avatarUrl: string;
  genres: string[];
}

export interface FollowUserParams {
  followingId: number;
  followerId: number;
}
