export type DevToArticleInput = {
  title?: string | undefined;
  body_markdown?: string | undefined;
  published?: boolean | undefined;
  series?: string | null | undefined;
  main_image?: string | undefined;
  canonical_url?: string | undefined;
  description?: string | undefined;
  tags?: string[] | undefined;
  organization_id?: number | undefined;
};
export interface DevToPublishResponse {
  type_of: string;
  id: number;
  title: string;
  description: string;
  cover_image: string;
  reading_time_minutes: number;
  created_at: string;
  published: boolean;
  published_at: string;
  tags: string[];
  tag_list: string;
  slug: string;
  path: string;
  url: string;
  canonical_url: string;
  comments_count: number;
  positive_reactions_count: number;
  public_reactions_count: number;
  page_views_count: number;
  published_timestamp: string;
  body_markdown: string;
  user: DevToUser;
  organization: Organization;
  flare_tag: FlareTag;
}

export interface DevToUser {
  name: string;
  username: string;
  twitter_username: string;
  github_username: string;
  user_id: number;
  website_url: any;
  profile_image: string;
  profile_image_90: string;
}

export interface Organization {
  name: string;
  username: string;
  slug: string;
  profile_image: string;
  profile_image_90: string;
}

export interface FlareTag {
  name: string;
  bg_color_hex: string;
  text_color_hex: string;
}
