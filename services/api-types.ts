// Auth Types
export interface RegisterRequest {
  phone: string;
  email: string;
  password: string;
  profile: {
    username: string;
    displayName: string;
    bio: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// User Types
export interface User {
  id: string;
  phone?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  phone?: string;
  email?: string;
}

// Profile Types
export interface Profile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarPath?: string;
  headerPath?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
  isFollowedBy?: boolean;
  isBlocked?: boolean;
  isMuted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  username?: string;
  displayName?: string;
  bio?: string;
}

export interface ProfileListResponse {
  data: Profile[];
  cursor?: string;
  hasMore: boolean;
}

// Post Types
export interface Post {
  id: string;
  content: string;
  authorId: string;
  author?: Profile;
  repliedPostId?: string;
  quotedPostId?: string;
  likesCount: number;
  repostsCount: number;
  repliesCount: number;
  quotesCount: number;
  isLiked?: boolean;
  isReposted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  content: string;
  repliedPostId?: string | null;
  quotedPostId?: string | null;
}

export interface PostListResponse {
  data: Post[];
  cursor?: string;
  hasMore: boolean;
}

// Feed Types
export interface FeedItem extends Post {}

export interface FeedResponse {
  data: FeedItem[];
  cursor?: string;
  hasMore: boolean;
}

// Error Response
export interface ErrorResponse {
  message: string;
  statusCode?: number;
}

// Pagination Types
export interface PaginationParams {
  cursor?: string;
  limit?: number;
}
