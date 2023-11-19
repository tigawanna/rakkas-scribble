import { serverSidePocketBaseInstance } from "@/lib/pb/client";
import { ScribblePostsResponse, ScribbleUserResponse } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { randomImageURL, removeDuplicatesFromStringList } from "@/utils/helpers/others";
import { RequestContext } from "rakkasjs";
import { DevToArticleInput, DevToPublishResponse } from "./types";

interface PublishProps {
  ctx: RequestContext<unknown>;
  input: Partial<ScribblePostsResponse>;
  publish?: boolean;
}
export async function updatePublishedScribbleToDevTo({
  ctx,
  input,
  publish = false,
}: PublishProps) {
  try {
    const devtoInput: DevToArticleInput = {
      body_markdown: input.content,
      description: input.description,
      title: input.title,
      main_image: randomImageURL(input.main_post_image_url),
      series: input.series,
      tags: input.tags?.split(",") ?? ["webdev"],
      published: publish,
    };

    const { data: pb, error: pb_error } = await tryCatchWrapper(
      serverSidePocketBaseInstance(ctx),
    );
    if (pb_error) return { data: null, error: { message: pb_error.message } };
    const user = pb?.authStore?.model as ScribbleUserResponse | undefined;
    if (!user) return { data: null, error: { message: "unauthorized" } };
    const key = user?.keys?.devto?.key;

    const { data, error } = await tryCatchWrapper(
      updateDevToArticleByID({
        id: input?.publishers?.devto?.id!,
        key,
        article: devtoInput,
      }),
    );

    if (error) {
      return { data: null, error: { message: error.message } };
    }

    if (data) {
      pb?.collection("scribble_posts").update(input?.id!, {
        main_post_image: input.main_post_image,
        main_post_image_url: input.main_post_image_url,
        tags: removeDuplicatesFromStringList(data.tags),
        publishers: {
          ...input?.publishers,
          devto: {
            ...input?.publishers?.devto,
            id: data?.id?.toString() ?? "",
            url: data?.url!,
          },
        },
      });

      return { data, error: null };
    }
    return { data: null, error: { message: "failed to publish to devto" } };
  } catch (error: any) {
    return {
      data: null,
      error: { message: "failed to publish to devto " + error?.message },
    };
  }
}

interface UpdateDevToScribbleByIDProps {
  id: string;
  key?: string;
  article?: DevToArticleInput;
}
export async function updateDevToArticleByID({
  id,
  key,
  article,
}: UpdateDevToScribbleByIDProps): Promise<DevToPublishResponse> {
  try {
    if (!key)
      throw new Error("missing devto key , register one in the setiings");
    if (!article) throw new Error("missing article");

    const response = await fetch(`https://dev.to/api/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "api-key": key,
        accept: "application/vnd.forem.api-v1+json",
      },
      body: JSON.stringify({ article }),
    });

    if (response.status !== 200) {
      throw new Error(
        "failed to update article :" + " statusText: " + response.statusText,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
