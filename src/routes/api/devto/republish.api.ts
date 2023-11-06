import { AxiosError } from "axios";
import { RequestContext } from "rakkasjs";
import { DevToApiClient } from "../helpers/dev.to";
import { DevToRepublishArticle } from "../helpers/dev.to/types";
import { json } from "@hattip/response";

export async function post(){
    
}

export async function POST(ctx: RequestContext) {
    const req=ctx.request
    try {
        const {
            apiKey,
            publishedBlogId,
            ...articleInput
        }: DevToRepublishArticle & { apiKey: string; publishedBlogId: string } = await req.json();

        const client = new DevToApiClient(apiKey);

        const { id, url } = await client.republish(publishedBlogId, {
            ...articleInput,
            published: true,
        });

        return json({ id, url });
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
                return json(
                    { message: "Your Dev.to account is not connected with Scribble" },
                    { status: 401 }
                );
            }
            return json(
                { message: err.response?.data.error },
                { status: err.response?.status || 500 }
            );
        }
    }
}
