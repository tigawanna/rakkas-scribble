import { ScribbleApiKeys, ScribblePostsResponse } from "@/lib/pb/db-types";
import {
  DevToArticle,

} from "@/lib/scribble/client/articles";
import { tryCatchWrapper } from "@/utils/async";
import { RequestContext } from "rakkasjs";
import PocketBase from "pocketbase";
import { PocketBaseClient } from "@/lib/pb/client";
import { removeDuplicatesFromStringList } from "@/utils/helpers/others";
import {  DevToArticleInput, DevToPublishResponse, publishScribbleToDevTo } from "@/lib/scribble/devto/publish-article";

const targets = ["devto", "medium", "hashnode"] as const;

interface PublishProps {
ctx: RequestContext<unknown>
  keys: ScribbleApiKeys;
  providers: [(typeof targets)[number]];
  input: Partial<ScribblePostsResponse>;
}

type ArticleRespoenses = DevToArticle["post"]["responses"];

// interface PublishScribbleToDevToProps {
//   key?: string;
//   article?: DevToArticleInput;
// }

// export async function publishScribbleToDevTo({
//   key,
//   article,
// }: PublishScribbleToDevToProps):Promise <DevToPublishResponse>{
//   try {
//     if (!key) throw "missing devto key , register one in the setiings";
//     if (!article) throw "missing article";
//     const response = await fetch("https://dev.to/api/articles", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "api-key": key,
//         accept: "application/vnd.forem.api-v1+json",
//       },
//       body: JSON.stringify({ article }),
//     });

//     const data = await response.json();
//     if (response.status !== 201) {
//       throw data.error;
//     }
//     return data
//   } catch (error) {
//     throw error;
//   }
// }

export async function publishToProviders({
  ctx,
  keys,
  providers,
  input,
}: PublishProps) {
  try {
    if (providers.includes("devto")) {
      if (!keys?.devto?.key) {
        return {
          error: "missing devto key , register one in the setiings",
          data: null,
        };
      }

      const devtoInput: DevToArticleInput = {
        body_markdown: input.contentMarkdown,
        description: input.description,
        title: input.title,
        // main_image: input.main_post_image,
        series: input.series,
        tags: input.tags,
        published: false,
      };
        // console.log("useSSM ctx === ",ctx)
      const pb_cookie = ctx.request.headers.get("cookie")??""
      const pb = new PocketBase(import.meta.env.RAKKAS_PB_URL) as PocketBaseClient
      pb.authStore.loadFromCookie(pb_cookie);
    
    let errors = []
    let successes = []

      const { data, error } = await tryCatchWrapper(
        publishScribbleToDevTo({ key: keys?.devto?.key, article: devtoInput }),
      );
   
      if(error){
        return { data: null, error: error?.message??error };
      }
      if(data){
        console.log("data.tags === ",removeDuplicatesFromStringList(data.tags))
        pb.collection("scribble_posts").update(input?.id!, {
         ...input, 
          tags: removeDuplicatesFromStringList(data.tags),
         publishers:{
            ...input?.publishers,
            devto:{
              ...input?.publishers?.devto,
              id:data?.id?.toString()??"",
              url:data?.url!
            }
          }
        })
        successes.push("devto")
      }
      return {data:successes,error:null}

    }
  } catch (error: any) {
    console.log("publish error message === ", error.message);
    console.log("publish full error === ", error);
    return { data: null, error };
  }
}
