import Axios, { AxiosInstance } from "axios";
import { operations, paths } from "../types";
import { OneDevtoPost } from "./types";
export type DevToArticle = paths["/api/articles"];
export type OneDevToArticle = paths["/api/articles/{id}"];

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
  public async publish(article: DevToArticle["post"]["requestBody"]) {
    type ArticleRespoenses = DevToArticle["post"]["responses"];
    interface Response {
      id: number;
      url: string;
    }
    const { data, status } = await this.axios.post<ArticleRespoenses["201"]>(
      "/articles",
      {
        article,
      },
    );
    if (status !== 201) {
      throw new Error("Failed to publish article");
    }
    if (!data) {
      throw new Error("Failed to publish article");
    }
    return data;
  }
  public async list(params: DevToArticle["get"]["parameters"]) {
    const { data, status } = await this.axios.get<
      DevToArticle["get"]["responses"]["200"]["content"]["application/json"]
    >("/articles", {
      params,
    });
    if (status !== 200) {
      throw new Error("Failed to list articles");
    }
    if (!data) {
      throw new Error("Failed to list articles");
    }
    return data;
  }
  public async one(id: number) {
    const { data, status } = await this.axios.get<OneDevtoPost>(
      `/articles/${id}`,
    );
    if (status !== 200) {
      throw new Error("Failed to get article");
    }
    if (!data) {
      throw new Error("Failed to get article");
    }
    return data;
  }
}
