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

    return json({ id, url });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        return json(
          { message: "Your Dev.to account is not connected with Scribble" },
          { status: 401 },
        );
      }
      return json(
        { message: err.response?.data.error },
        { status: err.response?.status || 500 },
      );
    }
  }
}
