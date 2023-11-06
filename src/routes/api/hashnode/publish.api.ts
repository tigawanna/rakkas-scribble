import { AxiosError } from "axios";
import { HashNodeApiClient } from "../helpers/hashnode";
import { HashNodeArticleInput } from "../helpers/hashnode/types";
import { RequestContext } from "rakkasjs";
import { json } from "@hattip/response";

export async function POST(ctx: RequestContext) {
  const req = ctx.request;
  try {
    const {
      apiKey,
      username,
      ...articleInput
    }: HashNodeArticleInput & { apiKey: string; username: string } =
      await req.json();

    const client = new HashNodeApiClient(apiKey);

    const { id, url } = await client.publish(username, {
      ...articleInput,
    });

    return json({data:{ id, url },error:null});
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        return json(
          {
            data: null,
            error: {
              message: "Your HashNode account is not connected with Scribble",
              original_error: err,
            },
          },
          { status: 401 },
        );
      }
      return json(
        {
          data: null,
          error: {
            message: err.response?.data?.errors[0]?.message || err.message,
            original_error: err,
          },
        },
        { status: err.response?.status || 500 },
      );
    } else if (err instanceof Error) {
      return json(
        { 
          data: null, 
          error: { message: err.message, original_error: err },
        },
        { status: 500 },
      );
    }
  }
}
