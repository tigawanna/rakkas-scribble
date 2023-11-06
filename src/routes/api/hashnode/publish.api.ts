import { AxiosError } from "axios";
import { HashNodeApiClient } from "../helpers/hashnode";
import { HashNodeArticleInput } from "../helpers/hashnode/types";
import { RequestContext } from "rakkasjs";
import { json } from "@hattip/response";


export async function POST(ctx:RequestContext) {
  const req = ctx.request
  try {
    const {
      apiKey,
      username,
      ...articleInput
    }: HashNodeArticleInput & { apiKey: string; username: string } = await req.json();

    const client = new HashNodeApiClient(apiKey);

    const { id, url } = await client.publish(username, {
      ...articleInput,
    });

    return json({ id, url });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        return json(
          { message: "Your HashNode account is not connected with Scribble" },
          { status: 401 }
        );
      }
      return json(
        { message: err.response?.data?.errors[0]?.message || err.message },
        { status: err.response?.status || 500 }
      );
    } else if (err instanceof Error) {
      return json({ message: err.message }, { status: 500 });
    }
  }
}
