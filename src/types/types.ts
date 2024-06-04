export interface FlagConfig {
  enabled?: boolean;
  users?: string[];
  locations?: string[];
  percentage?: number;
}

export interface UserContext {
  userId?: string;
  username?: string;
}

export interface LocationContext {
  city?: string;
  state?: string;
  country?: string;
}
