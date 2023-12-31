import { AxiosError } from "axios";
import { RequestContext } from "rakkasjs";
import { HashNodeApiClient } from "../helpers/hashnode";
import { RepublishHashNodeArticleInput } from "../helpers/hashnode/types";
import { json } from "@hattip/response";


export async function POST(ctx:RequestContext) {
    const req = ctx.request
    try {
        const {
            apiKey,
            username,
            publishedBlogId,
            ...articleInput
        }: RepublishHashNodeArticleInput & {
            apiKey: string;
            username: string;
            publishedBlogId: string;
        } = await req.json();

        const client = new HashNodeApiClient(apiKey);

        const { id, url } = await client.republish(publishedBlogId, username, {
            ...articleInput,
        });

        return json({data:{ id, url },error:null});
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
                return json(
                    { data:null,
                        error:{
                            message: "Your HashNode account is not connected with Scribble",
                            original_error: err
                        } },
                    { status: 401 }
                );
            }
            return json(
                { data:null,error:{message: err.response?.data?.errors[0]?.message || err.message, original_error: err} },
                { status: err.response?.status || 500 }
            );
        } else if (err instanceof Error) {
            return json({ data:null,error:{message: err.message, original_error: err} }, { status: 500 });
        }
    }
}
