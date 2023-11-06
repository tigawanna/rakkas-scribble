import { RequestContext } from "rakkasjs";
import { DevToArticleInput } from "../helpers/dev.to/types";
import { DevToApiClient } from "../helpers/dev.to";
import { json } from "@hattip/response";
import { AxiosError } from "axios";

export async function POST(ctx:RequestContext) {
    const req = ctx.request
  try {
    const { apiKey, ...articleInputs }: DevToArticleInput & { apiKey: string } =
      await req.json();

    const client = new DevToApiClient(apiKey);

    const { id, url } = await client.publish({
      ...articleInputs,
      published: true,
    });

    return json({data:{ id, url},error:null });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        return json(
          {data:null,
          error:{ message: "Your Dev.to account is not connected with Scribble",
          original_error: err}},
          { status: 401 },
        );
      }
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
