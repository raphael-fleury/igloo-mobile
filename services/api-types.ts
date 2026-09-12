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
export type TokenResponse = AuthResponse;

// Error Types
export interface ApiError {
  message: string;
}
export type ErrorResponse = ApiError;
export type UnauthorizedError = ApiError;
export type ForbiddenError = ApiError;
export type NotFoundError = ApiError;
export type UnprocessableEntityError = ApiError;
export type ConflictError = ApiError;

// User Types
export interface User {
  id: string;
  phone: string;
  email: string;
  createdAt: string;
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
  avatarPath?: string | null;
  headerPath?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  username?: string;
  displayName?: string;
  bio?: string;
}

// Post Types
export interface Post {
  id: string;
  content: string;
  profile: Profile;
  repliedPostId?: string | null;
  quotedPostId?: string | null;
  createdAt: string;
}

export interface Mention {
  id: string;
  mentionedProfile: Profile;
  usernameAtMention: string;
}

export interface PostDetailed extends Post {
  repliedPost?: Post | null;
  quotedPost?: Post | null;
  mentions: Mention[];
  likes: number;
  reposts: number;
  replies: number;
  quotes: number;
}

export interface CreatePostRequest {
  content: string;
  repliedPostId?: string | null;
  quotedPostId?: string | null;
}

export interface DeletedResponse {
  message: string;
  deletedAt: string;
}

// Pagination & Response Page Types
export interface PaginationParams {
  cursor?: string;
  limit?: number;
}
export type PageQuery = PaginationParams;

export interface Page<T> {
  hasNextPage: boolean;
  nextCursor?: string;
  count: number;
  items: T[];
}

export type PostsPage = Page<PostDetailed>;
export type PostListResponse = PostsPage;

export type FollowedProfile = Profile & { followedAt: string };
export type FollowsPage = Page<FollowedProfile>;
export type ProfileListResponse = FollowsPage;

export type BlockedProfile = Profile & { blockedAt: string };
export type BlockedProfilesPage = Page<BlockedProfile>;

export type MutedProfile = Profile & { mutedAt: string };
export type MutedProfilesPage = Page<MutedProfile>;

export type LikedProfile = Profile & { likedAt: string };
export type LikesPage = Page<LikedProfile>;

export type RepostedProfile = Profile & { repostedAt: string };
export type RepostsPage = Page<RepostedProfile>;

// Notifications Types
export type NotificationType = 'follow' | 'like' | 'repost' | 'reply' | 'quote';

export interface Notification {
  id: string;
  type: NotificationType;
  targetProfile: Profile;
  actorProfile: Profile;
  post?: Post | null;
  isRead: boolean;
  createdAt: string;
}

export type NotificationsPage = Page<Notification>;

export interface NotificationsReadPayload {
  notificationIds?: string[];
}

export interface SuccessResponse {
  success: boolean;
}
