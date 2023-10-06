import { Post, PostType } from "./posts-models";

export interface QueryPostsParams {
  userId?: string;
  resultsPerPage?: number;
  page?: number;
  type?: PostType;
}

export interface PostsResponse {
  remainingCount: number;
  remainingPages: number;
  count: number;
  posts: Post[];
}

export interface GetRepliesParams {
  postId: string;
  resultsPerPage?: number;
  page?: number;
}