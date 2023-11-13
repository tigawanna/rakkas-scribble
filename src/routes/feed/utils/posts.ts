import { ScribbleUserResponse } from "@/lib/pb/db-types";
import { DevToApiClient } from "@/lib/publish/devto/client/articles";
import { PageContext, RequestContext } from "rakkasjs";
import PostsJSON from "./dummy.json";

interface GetDevToPostsParameters {
  ctx: PageContext | RequestContext<unknown>;
}
export async function getDevToPosts({ ctx }: GetDevToPostsParameters) {
  try {
    return PostsJSON;
    // const user  = ctx.locals.pb.authStore.model as ScribbleUserResponse
    // console.log("user in getDevToPosts", user);
    // if (!user.keys?.devto?.key){
    //     throw new Error("No devto api key");
    // }
    // const devTo = new DevToApiClient(user.keys?.devto?.key);
    // return devTo.list({})
  } catch (error) {
    throw error;
  }
}
interface GetOneDevToPostsParameters {
  ctx: PageContext | RequestContext<unknown>;
  id: string;
}
export async function getOneDevToPost({ ctx, id }: GetOneDevToPostsParameters) {
  try {
    //  return   PostsJSON.filter(post=>post.id===parseInt(id))[0]
    const user = ctx.locals.pb.authStore.model as ScribbleUserResponse;
    // console.log("user in getDevToPosts", user);
    if (!user.keys?.devto?.key) {
      throw new Error("No devto api key");
    }

    // const devTo = new DevToApiClient(user.keys?.devto?.key);
    // return devTo.one(parseInt(id))
    const response = await ctx
      .fetch(`https://dev.to/api/articles/${id}`, {
        headers: {
          "api-key": user.keys?.devto?.key,
          accept: "application/vnd.forem.api-v1+json",
        },
      })
      .then((res) => res.json());
    console.log(" one devtoo post response ============= ", response);
    return response;
  } catch (error) {
    throw error;
  }
}
