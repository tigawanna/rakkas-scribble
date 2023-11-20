import { paths } from "../types";

type UnpublishArticle = paths["/api/articles/{id}/unpublish"];
type UnpublishArticleParameters =
  paths["/api/articles/{id}/unpublish"]["put"]["parameters"];

type DevtoUnpublishArticle = {
  key?: string;
} & UnpublishArticleParameters;

export async function devtoUnpublishArticle({
  key,
  path,
  query,
}: DevtoUnpublishArticle) {
  try {
    console.log({ path, query, key });
    if (!path?.id) {
      return {
        data: null,
        error: {
          message: "missing article id",
        },
      };
    }
    if (!key) {
      return {
        data: null,
        error: {
          message: "unautohorized",
        },
      };
    }
    const unpiblish_url = new URL(
      `https://dev.to/api/articles/${path?.id}/unpublish`,
    );
    if (query?.note) {
      unpiblish_url.searchParams.set("note", query?.note);
    }
    const response = await fetch(unpiblish_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "api-key": key,
        accept: "application/vnd.forem.api-v1+json",
      },
      // body: JSON.stringify({}),
    });
    console.log(
      "===== DEVTO UNPUBLISHED RESPONSE =====",
      response.status,
      response.statusText,
    );
    if (response.ok) {
      const data = await response.json();
      return {
        data,
        error: null,
      };
    }
    return {
      data: null,
      error: {
        message: response.statusText,
      },
    };
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.message,
      },
    };
  }
}
