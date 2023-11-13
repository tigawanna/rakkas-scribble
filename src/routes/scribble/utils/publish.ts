import { pb } from "@/lib/pb/client";
import { ScribblePostsResponse, ScribbleUserResponse } from "@/lib/pb/db-types";
import { DevToApiClient } from "@/lib/scribble/client/articles";



const targets = ["devto", "medium", "hashnode"] as const;

interface PublishProps {
    providers: [typeof targets[number]];
     input: Partial<ScribblePostsResponse>
}

export async function publishToProviders({providers,input}:PublishProps) {
    try {
        const user = pb.authStore.model as ScribbleUserResponse
        if (providers.includes("devto")){
            if (!user.keys?.devto?.key){
                throw new Error("missing devto key , register one in the setiings")
            }
           return new DevToApiClient(user.keys?.devto?.key).publish({
                body_markdown: input.contentMarkdown,
                description: input.description,
                title: input.title,
                main_image: input.main_post_image,
                series: input.series,
                tags: input.tags,
                published: false,
            })
        }
    } catch (error:any) {
        console.log("publish error message === ",error.message)
        console.log("publish full error === ",error)
        throw error
    }

}
