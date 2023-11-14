

interface PublishScribbleToDevToProps {
    key?: string;
    article?: DevToArticleInput;
}

export async function publishScribbleToDevTo({
    key,
    article,
}: PublishScribbleToDevToProps): Promise<DevToPublishResponse> {
    try {
        if (!key) throw "missing devto key , register one in the setiings";
        if (!article) throw "missing article";
        const response = await fetch("https://dev.to/api/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": key,
                accept: "application/vnd.forem.api-v1+json",
            },
            body: JSON.stringify({ article }),
        });

        const data = await response.json();
        if (response.status !== 201) {
            throw "failed to publish article :"+data.error
        }
        return data
    } catch (error) {
        throw error;
    }
}


interface UpdateDevToScribbleByIDProps {
    id: number;
    key?: string;
    article?: DevToArticleInput;
}
export async function updateDevToScribbleByID({
    id,
    key,
    article,
}: UpdateDevToScribbleByIDProps): Promise<DevToPublishResponse> {
    try {
        if (!key) throw "missing devto key , register one in the setiings";
        if (!article) throw "missing article";
        const response = await fetch("https://dev.to/api/articles/" + id + "", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": key,
                accept: "application/vnd.forem.api-v1+json",
            },
            body: JSON.stringify({ article }),
        });

        const data = await response.json();
        if (response.status !== 201) {
            throw "failed to update article :"+data.error
        }
        return data
    } catch (error) {
        throw error;
    }
}




export type DevToArticleInput = {
    title?: string | undefined;
    body_markdown?: string | undefined;
    published?: boolean | undefined;
    series?: string | null | undefined;
    main_image?: string | undefined;
    canonical_url?: string | undefined;
    description?: string | undefined;
    tags?: string | undefined;
    organization_id?: number | undefined;
};
export interface DevToPublishResponse {
    type_of: string
    id: number
    title: string
    description: string
    readable_publish_date: string
    slug: string
    path: string
    url: string
    comments_count: number
    public_reactions_count: number
    collection_id: number
    published_timestamp: string
    positive_reactions_count: number
    cover_image: string
    social_image: string
    canonical_url: string
    created_at: string
    edited_at: any
    crossposted_at: any
    published_at: string
    last_comment_at: string
    reading_time_minutes: number
    tag_list: string
    tags: any[]
    body_html: string
    body_markdown: string
    user: User
}

export interface User {
    name: string
    username: string
    twitter_username: string
    github_username: string
    user_id: number
    website_url: any
    profile_image: string
    profile_image_90: string
}


