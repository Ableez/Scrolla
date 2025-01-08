export type UserProfile = {
  id: string;
  username: string;
  handle: string;
  isVerified: boolean;
  avatarUrl: string;
  profileCompletion: number;
  yuBucksBalance: number;
  friendsCount: number;
  hasPixelCollection: boolean;
  appleIdConnected: boolean;
};

export type ProfileState = {
  profile: UserProfile;
  isLoading: boolean;
  error: string | null;
};

export type ProfileAction =
  | { type: "UPDATE_PROFILE"; payload: Partial<UserProfile> }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };
