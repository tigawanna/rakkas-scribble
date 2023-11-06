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
