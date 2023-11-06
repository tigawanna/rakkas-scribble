import { BlogProviders, BlogUser } from "@/types";
import { json } from "@hattip/response";
import { AxiosError } from "axios";
import { RequestContext } from "rakkasjs";
import { DevToApiClient } from "../helpers/dev.to";
import { HashNodeApiClient } from "../helpers/hashnode";
import { MediumApiClient } from "../helpers/medium";
import { ScribbleUserResponse } from "@/lib/pb/db-types";

export async function POST(ctx: RequestContext) {
  const req = ctx.request;
  try {
    const user = await ctx.locals.pb
      ?.collection("scribble_user")
      .authRefresh<ScribbleUserResponse>();
    const devToAPIKey = user.record.keys?.devto;
    const hashNodeAPIKey = user.record.keys?.hashnode?.key;
    const hashNodeUsername = user.record.keys?.hashnode?.username;
    const mediumAPIKey = user.record.keys?.medium;
    // const { devToAPIKey, hashNodeAPIKey, hashNodeUsername, mediumAPIKey } = user.record.keys

    let devToAccount;
    if (devToAPIKey) {
      try {
        const devToClient = new DevToApiClient(devToAPIKey);
        devToAccount = await devToClient.getAuthUser();
      } catch (err) {
        devToAccount = undefined;
      }
    }

    let hashNodeAccount;
    if (hashNodeAPIKey && hashNodeUsername) {
      try {
        const hashNodeClient = new HashNodeApiClient(hashNodeAPIKey);
        hashNodeAccount = await hashNodeClient.getAuthUser(hashNodeUsername);
      } catch (err) {
        hashNodeAccount = undefined;
      }
    }

    let mediumAccount;
    if (mediumAPIKey) {
      try {
        const mediumClient = new MediumApiClient(mediumAPIKey);
        mediumAccount = await mediumClient.getAuthUser();
      } catch (err) {
        mediumAccount = null;
      }
    }

    return json({
        data:{
            accounts: {
                "dev.to": devToAccount,
                hashNode: hashNodeAccount,
                medium: mediumAccount,
            },
            apiKeys: {
                "dev.to": devToAPIKey,
                hashNode: hashNodeAPIKey,
                medium: mediumAPIKey,
            },
        },
        error:null

    });
  } catch (err) {
    if (err instanceof AxiosError) {
      return json(
        {error:{ message: err.message,orignal_error:err },data:null},
        { status: err.response?.status || 500 },
      );
    }
  }
}

export interface GetIntegrationStatusResponse {
  accounts: Record<BlogProviders, BlogUser | undefined>;
  apiKeys: Record<BlogProviders, string | null>;
}
