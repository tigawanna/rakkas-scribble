export interface DevToArticleInput {
  title: string;
  description?: string;
  body_markdown: string;
  published?: boolean;
  series?: string;
  main_image: string | null;
  canonical_url?: string;
  tags?: string[];
}

export interface DevToPublishArticleResponse {
  id: number;
  url: string;
}

export interface DevToUser {
  id: number;
  username: string;
  name: string;
  profile_image: string;
}

export type DevToRepublishArticle = Omit<DevToArticleInput, "canonical_url">;
