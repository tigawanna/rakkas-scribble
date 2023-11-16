import { ScribbleApiKeys, ScribblePostsResponse } from "@/lib/pb/db-types";
import { DevToArticle} from "@/lib/scribble/client/articles";
import { tryCatchWrapper } from "@/utils/async";
import { RequestContext } from "rakkasjs";
import PocketBase from "pocketbase";
import { PocketBaseClient } from "@/lib/pb/client";
import { removeDuplicatesFromStringList } from "@/utils/helpers/others";
import { publishScribbleToDevTo } from "@/lib/scribble/devto/publish-article";
import { DevToArticleInput } from "@/lib/scribble/devto/types";

const targets = ["devto", "medium", "hashnode"] as const;

interface PublishProps {
ctx: RequestContext<unknown>
  keys: ScribbleApiKeys;
  providers: [(typeof targets)[number]];
  input: Partial<ScribblePostsResponse>;
}



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


        // console.log("useSSM ctx === ",ctx)
      const pb_cookie = ctx.request.headers.get("cookie")??""
      const pb = new PocketBase(import.meta.env.RAKKAS_PB_URL) as PocketBaseClient
      pb.authStore.loadFromCookie(pb_cookie);
    
    let errors = []
    let successes = []

      const { data, error } = await publishScribbleToDevTo({ ctx,input})
      
      console.log(" ============== DEVTO UPDATE ============= ", { data, error });
   
      if(error){
        return { data: null, error: error?.message??error };
      }
      if(data){
        pb.collection("scribble_posts").update(input?.id!, {
         ...input, 
          tags: removeDuplicatesFromStringList(data.tags),
         publishers:{
            ...input?.publishers,
            devto:{
              ...input?.publishers?.devto,
              id:data.id?.toString()??"",
              url:data.url!
            }
          }
        })
        successes.push("devto")
      }
      return {data:successes,error:null}

    }
  } catch (error: any) {
    // console.log("publish error message === ", error.message);
    // console.log("publish full error === ", error);
    return { data: null, error };
  }
}
