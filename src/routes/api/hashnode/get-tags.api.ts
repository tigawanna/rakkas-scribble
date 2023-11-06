import { RequestContext } from "rakkasjs";
import { HashNodeApiClient } from "../helpers/hashnode";
import { json } from "@hattip/response";

export async function POST(ctx: RequestContext) {
  const req = ctx.request;
  const { apiKey } = await req.json();

  const client = new HashNodeApiClient(apiKey);

  const { tags } = await client.getAvailableTags();

  return json({ tags });
}
