import { RequestContext } from "rakkasjs";
import { json } from "@hattip/response";

export async function get(ctx: RequestContext) {
    return json({
        hello: "world",
    })
}
