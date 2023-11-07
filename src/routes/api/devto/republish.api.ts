import { AxiosError } from "axios";
import { RequestContext } from "rakkasjs";
import { json } from "@hattip/response";
import { DevToRepublishArticle, DevToApiClient } from "@/lib/publish/devto";

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

        return json({ data: { id, url }, error: null });
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
                return json(
                    {
                        data: null,
                        error: {
                            message: "Your Dev.to account is not connected with Scribble",
                            original_error: err
                        }
                    },
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
