import { serverSidePocketBaseInstance } from "@/lib/pb/client";
import { ScribbleUserResponse } from "@/lib/pb/db-types";
import { RequestContext } from "rakkasjs";

export async function canProompt(ctx: RequestContext): Promise<{
  can_proompt: boolean;
  can_proompt_after: number;
}> {
  try {
    // return {
    //   can_proompt: true,
    //   can_proompt_after: 0,
    // };
    // const user = pb?.authStore.model as ScribbleUserResponse;
    // const user = await (await pb?.collection("scribble_user").authRefresh())?.record
    const pb = await serverSidePocketBaseInstance(ctx);
    const local_user = pb?.authStore?.model as ScribbleUserResponse;
    const user = await pb?.collection("scribble_user").getOne(local_user.id);
    // console.log(" ================ user =============",user)
    if(!user){
      return {
        can_proompt: false,
        can_proompt_after: 1,
      };
    }
        const last_proompted_at = user?.last_proompted_at ? new Date(user.last_proompted_at): new Date();
        const last_proompted_at_hour = user?.last_proompted_at?last_proompted_at.getHours():3
        const this_hour = new Date().getHours();
        // console.log(" ======= last proompted at hour ==========",user.last_proompted_at)
        // console.log({ last_proompted_at_hour ,last_proompted_at})
          if (last_proompted_at_hour <= this_hour - 3) {
          try {
            await pb?.collection("scribble_user").update(user.id, {
              // @ts-expect-error
              last_proompted_at: new Date()
            });
            // console.log(" ================ updated last letter on =============",updated_user)
            return {
              can_proompt: true,
              can_proompt_after: 0,
            };
          } catch (error) {
            console.log("error updating last proompt on", error);
            return {
              can_proompt: false,
              can_proompt_after: 1,
            };
          }
        } else {
          return {
            can_proompt: false,
            can_proompt_after: this_hour - last_proompted_at_hour + 3,
          };
        
      }

    return {
      can_proompt: false,
      can_proompt_after: 1,
    };
  } catch (error) {
    console.log("error updating last proompt on", error);
    return {
      can_proompt: false,
      can_proompt_after: 1,
    };
  }
}
