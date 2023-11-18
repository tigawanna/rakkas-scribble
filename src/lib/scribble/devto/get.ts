import { paths } from "../types";
import { DevToPublishResponse } from "./types";


type OneArticle = paths["/api/articles/{id}"]["get"]
type GetOneDevtoPostParameters = OneArticle["parameters"]
type GetOneDevtoPost200Response = OneArticle["responses"]["200"]["content"]["application/json"]








type GetDevtoPostByIdProps = {
key?: string;
} & GetOneDevtoPostParameters

export async function getDevtoPostById({path:{id},key}:GetDevtoPostByIdProps ): Promise<{
  data:DevToPublishResponse | null;
  error: null | { message: string };
}> {
  try {
    if (!key)
      return {
        data: null,
        error: { message: "missing devto key , register one in the setiings" },
      };
    const url = `https://dev.to/api/articles/${id}`;
console.log("======= DEVTO ONE POST URL =======",url)
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "api-key": key,
        accept: "application/vnd.forem.api-v1+json",
      },
    });
    console.log("===== DEVTO ONE POST RESPONSE =====", response.status, response.statusText);
    if (response.status !== 200) {
      return {
        data: null,
        error: {
          message:
            "failed to fetch :" +
            " ststus: " +
            response.status +
            " statusText: " +
            response.statusText,
        },
      };
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message },
    };
  }
}


type MeArticles = paths["/api/articles/me"]["get"]
type GetDevtoPostsParameters = MeArticles["parameters"]
type GetDevtoPosts200Response = MeArticles["responses"]["200"]["content"]["application/json"]

type GetDevtoPostsProps = {
  key?: string;
} & GetDevtoPostsParameters
export async function getDevtoPublishedPosts(
  { key, query }: GetDevtoPostsProps
): Promise<{
  data: GetDevtoPosts200Response | null;
  error: null | { message: string };
}> {
  try {
    if (!key)
      return {
        data: null,
        error: { message: "missing devto key , register one in the setiings" },
      };
    const posts_url = new URL("https://dev.to/api/articles/me/unpublished");
    if(query?.page){
      posts_url.searchParams.set("page",query?.page?.toString());
    }
    if(query?.per_page){
      posts_url.searchParams.set("per_page",query?.per_page?.toString());

    }
    const response = await fetch(posts_url, {
      headers: {
        "Content-Type": "application/json",
        "api-key": key,
         accept: "application/vnd.forem.api-v1+json",
      },
    });
    console.log("===== DEVTO POSTS RESPOENE =====", response.status, response.statusText);
    if (response.status !== 200) {
      return {
        data: null,
        error: {
          message:
            "failed to fetch :" +
            " ststus: " +
            response.status +
            " statusText: " +
            response.statusText,
        },
      };
    }
    const data = await response.json();
console.log("===== DEVTO POSTS DATA =====", data);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message },
    };
  }
}


