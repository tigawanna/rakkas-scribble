import { BlogUser, PublishBlogResponse } from "@/types";
import Axios, { AxiosInstance } from "axios";


export class DevToApiClient {
  private _apiKey: string;
  public axios: AxiosInstance;

  constructor(_apiKey: string) {
    this._apiKey = _apiKey;
    this.axios = Axios.create({
      baseURL: "https://dev.to/api",
      headers: {
        "api-key": this._apiKey,
        accept: "application/vnd.forem.api-v1+json",
      },
    });
  }

  public async publish(article: DevToArticleInput): Promise<PublishBlogResponse> {
    interface Response {
      id: number;
      url: string;
    }
    const { data } = await this.axios.post<Response>("/articles", {
      article,
    });
    return { url: data.url, id: data.id.toString() };
  }

  public async republish(id: string, article: DevToRepublishArticle): Promise<PublishBlogResponse> {
    const { data } = await this.axios.put(`/articles/${id}`, {
      article,
    });
    // Change this
    return { url: data.url, id: data.id.toString() };
  }

  public async getAuthUser(): Promise<BlogUser> {
    const { id, name, profile_image, username } = (await this.axios.get<DevToUser>("/users/me"))
      .data;
    return { id: id.toString(), username, name, avatarUrl: profile_image };
  }
}



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
