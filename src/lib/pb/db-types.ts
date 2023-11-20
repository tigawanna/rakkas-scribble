export type ScribbleApiKeys = {
  hashnode?: {
    key: string;
    username: string;
  };
  devto?: {
    key: string;
    username: string;
  };
  medium?: {
    key: string;
    username: string;
  };
  github?: {
    key: string;
    username: string;
  };
};
export type ScribblePublishers = {
  hashnode?: {
    url: string;
    id: string;
  };
  devto?: {
    url: string;
    id: string;
  };
  medium?: {
    url: string;
    id: string;
  };
  github?: {
    url: string;
    id: string;
  };
};

/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
type BaseCollectionRecord = {
  id: string;
  created: string;
  updated: string;
};

// https://pocketbase.io/docs/collections/#auth-collection
type AuthCollectionRecord = {
  id: string;
  created: string;
  updated: string;
  username: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
};

// https://pocketbase.io/docs/collections/#view-collection
type ViewCollectionRecord = {
  id: string;
};

// utilities

type MaybeArray<T> = T | T[];

// ===== scribble_posts =====

export type ScribblePostsResponse = {
  title?: string;
  content?: string;
  user_id?: string;
  status?: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "REPUBLISHED";
  tags?: string;
  publishingDetails?: any;
  publishers?: ScribblePublishers;

  last_published_at?: string;

  post_media?: Array<string>;
  main_post_image?: string;
  main_post_image_url?: string;
  description?: string;
  series?: string;
  published_at?: string;
} & BaseCollectionRecord;

export type ScribblePostsCreate = {
  title?: string;
  content?: string;
  user_id?: string;
  status?: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "REPUBLISHED";
  tags?: string;
  publishingDetails?: any;

  publishers?: ScribblePublishers;
  last_published_at?: string;

  post_media?: MaybeArray<string>;
  main_post_image?: string | File | null;
  main_post_image_url?: string;
  description?: string;
  series?: string;
  published_at?: string;
};

export type ScribblePostsUpdate = {
  title?: string;
  content?: string;
  user_id?: string;
  status?: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "REPUBLISHED";
  tags?: string;
  publishingDetails?: any;

  last_published_at?: string;
  publishers?: ScribblePublishers;
  post_media?: MaybeArray<string>;

  main_post_image?: string | File | null;
  main_post_image_url?: string;
  description?: string;
  series?: string;
  published_at?: string;
};

export type ScribblePostsCollection = {
  type: "base";
  collectionId: "6itgi5d0trmi1yb";
  collectionName: "scribble_posts";
  response: ScribblePostsResponse;
  create: ScribblePostsCreate;
  update: ScribblePostsUpdate;
  relations: {};
};

// ===== scribble_user =====

export type ScribbleUserResponse = {
  github_username?: string;
  username?: string;
  email?: string;
  linkedin_username?: string;
  country?: string;
  city?: string;
  phone?: string;
  langauges?: string;
  avatar?: string;
  about_me?: string;
  github_access_token?: string;
  last_proompted_at?: string;
  keys?: ScribbleApiKeys;
} & AuthCollectionRecord;

export type ScribbleUserCreate = {
  github_username?: string;
  username?: string;
  email?: string;
  linkedin_username?: string;
  country?: string;
  city?: string;
  phone?: string;
  langauges?: string;
  avatar?: string;
  about_me?: string;
  github_access_token?: string;
  last_proompted_at?: string;
  keys?: ScribbleApiKeys;
};

export type ScribbleUserUpdate = {
  github_username?: string;
  username?: string;
  email?: string;
  linkedin_username?: string;
  country?: string;
  city?: string;
  phone?: string;
  langauges?: string;
  avatar?: string;
  about_me?: string;
  github_access_token?: string;
  last_proompted_at?: string;
  keys?: ScribbleApiKeys;
};

export type ScribbleUserCollection = {
  type: "auth";
  collectionId: "51hjtt652zdrck6";
  collectionName: "scribble_user";
  response: ScribbleUserResponse;
  create: ScribbleUserCreate;
  update: ScribbleUserUpdate;
  relations: {};
};

// ===== rate_limitter =====

export type RateLimitterResponse = {
  last_proompted?: string;
  user_id?: string;
} & BaseCollectionRecord;

export type RateLimitterCreate = {
  last_proompted?: string | Date;
  user_id?: string;
};

export type RateLimitterUpdate = {
  last_proompted?: string | Date;
  user_id?: string;
};

export type RateLimitterCollection = {
  type: "base";
  collectionId: "ocr07zxiuigx4qh";
  collectionName: "rate_limitter";
  response: RateLimitterResponse;
  create: RateLimitterCreate;
  update: RateLimitterUpdate;
  relations: {};
};

// ===== Schema =====

export type Schema = {
  scribble_posts: ScribblePostsCollection;
  scribble_user: ScribbleUserCollection;
  rate_limitter: RateLimitterCollection;
};
