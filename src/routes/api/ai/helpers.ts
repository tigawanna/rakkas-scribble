import {
  serverSideAdminPocketBaseInstance,
  serverSidePocketBaseInstance,
} from "@/lib/pb/client";
import { ScribbleUserResponse } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { RequestContext } from "rakkasjs";

export async function canProompt(
  ctx: RequestContext,
  user_id?: string,
): Promise<{
  can_proompt: boolean;
  can_proompt_after: number;
  issue?: string;
}> {
  try {
    if (!user_id) {
      return {
        can_proompt: false,
        can_proompt_after: 1,
        issue: "user_id is required",
      };
    }
    const pb = await serverSideAdminPocketBaseInstance(ctx);
    const rate_limit = await tryCatchWrapper(
      pb
        ?.collection("rate_limitter")
        .getFirstListItem(`user_id = "${user_id}"`),
    );
    if (rate_limit.error) {
      const data = {
        last_proompted: new Date(),
        user_id: user_id,
      };
      const create_rate_limit = await tryCatchWrapper(
        pb.collection("rate_limitter").create(data),
      );
      if (create_rate_limit.error) {
        return {
          can_proompt: false,
          can_proompt_after: 1,
          issue: create_rate_limit.error.message,
        };
      }
      if (create_rate_limit.data) {
        return {
          can_proompt: true,
          can_proompt_after: 0,
          issue: "",
        };
      }
    }

    if (rate_limit.data) {
      const last_proompted_at = rate_limit.data.last_proompted
        ? new Date(rate_limit.data.last_proompted!)
        : new Date();
      const last_proompted_at_hour = rate_limit.data.last_proompted
        ? last_proompted_at.getHours()
        : 3;
      const this_hour = new Date().getHours();

      if (last_proompted_at_hour <= this_hour - 3) {
        try {
          const data = {
            last_proompted: new Date(),
            user_id: user_id,

          };
          await pb.collection("rate_limitter").update(rate_limit.data.id, data);
        return {
            can_proompt: true,
            can_proompt_after: 0,
            issue: "",
          };
        } catch (error) {
          console.log("error updating last proompt on", error);
          return {
            can_proompt: false,
            can_proompt_after: 1,
            issue: "error updating last proompt on",
          };
        }
      } else {
        return {
          can_proompt: false,
          can_proompt_after: this_hour - last_proompted_at_hour + 3,
          issue:
            "please try again after " +
            (this_hour - last_proompted_at_hour + 3) +
            " hours",
        };
      }

    }
    return {
      can_proompt: false,
      can_proompt_after: 2,
      issue: "try again later",
    };
  } catch (error) {
    console.log("error updating last proompt on", error);
    return {
      can_proompt: false,
      can_proompt_after: 1,
      issue: "error updating last proompt on",
    };
  }
}
