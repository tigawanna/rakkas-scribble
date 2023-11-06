import { RequestContext } from "rakkasjs";
import { HashNodeApiClient } from "../helpers/hashnode";
import { json } from "@hattip/response";

export async function POST(ctx: RequestContext) {
  const req = ctx.request;
  try {
    const { apiKey } = await req.json();
    const client = new HashNodeApiClient(apiKey);
    const { tags } = await client.getAvailableTags();

    return json({ data: { tags }, error: null });
  } catch (error: any) {
    return json(
      { data: null, 
        error: { message: error.message, original_error: error } },
      {
        status: 500,
      },
    );
  }
}
