import { useFormHook } from "@/components/form/useForm";
import { Spinner } from "@/components/navigation/loaders/Spinner";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import Cherry from "cherry-markdown";
import { ClientSuspense, usePageContext, useQuery } from "rakkasjs";
import { lazy, useDeferredValue, useEffect, useRef } from "react";
import { BlogEditorControls } from "./BlogEditorControls";
import { useUpdateBlogMutation } from "./useBlogMutation";
import { SubmitButton } from "@/components/form/inputs/SubmitButton";
import { ChefHat } from "lucide-react";
import { CherryTypes } from "@/components/editor/utils/types";
import { BlogImages } from "./BlogImages";
import { NewPostModal } from "./NewPostModal";
import { BlogImagesmodal } from "./BlogImagesmodal";
const CherryMarkdownEditor = lazy(
  () => import("@/components/editor/CherryMarkdownEditor"),
);

interface EditBlogProps {
  blog_id: string;


}

type BlogFormInput = Omit<ScribblePostsResponse,"created" | "updated">;
export function BlogEditor({ blog_id }: EditBlogProps) {
  const cherry =useRef<Cherry | null>(null);
const { update_post_mutation,page_ctx } = useUpdateBlogMutation();
  const query = useQuery("blog" + blog_id, () => {
    return tryCatchWrapper(
      page_ctx.locals.pb?.collection("scribble_posts").getOne(blog_id),
    );
  });
  const data = query.data.data;
  const { input, setInput } = useFormHook<BlogFormInput>({
    initialValues: {
      id: data?.id!,
      content: data?.content,
      title: data?.title,
      contentMarkdown: data?.contentMarkdown,
      devToArticleCoverImagePath: data?.devToArticleCoverImagePath,
      devToArticleId: data?.devToArticleId,
      devToBlogUrl: data?.devToBlogUrl,
      hashNodeArticleCoverImagePath: data?.hashNodeArticleCoverImagePath,
      hashNodeArticleId: data?.hashNodeArticleId,
      hashNodeBlogUrl: data?.hashNodeBlogUrl,
      last_published_at: data?.last_published_at,
      mediumArticleId: data?.mediumArticleId,
      mediumBlogUrl: data?.mediumBlogUrl,
      post_media: data?.post_media,
      publishingDetails: data?.publishingDetails,
      status: data?.status,
      tags: data?.tags,
      user_id: data?.user_id,
    },
  });

  
// useEffect(()=>{
//   if(cherry.current){
//   const options = cherry.current.options as CherryTypes["options"]
//   cherry.current.options = options.
//   fileUpload = (file, callback) => {
//     console.log("aftre change");
//     page_ctx.locals.pb
//       ?.collection("scribble_posts")
//       .update(blog_id, {
//         // @ts-expect-error
//         post_media: input.post_media ? [...input.post_media, file] : [file],
//       })
//       .then((res) => {
//         console.log("res", res);
//         if (res) {
//           callback(res.post_media[0]);
//         }
//       })
//       .catch((err) => console.log(err));
//   };
 
//   }
  
// },[cherry.current])


  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <ClientSuspense fallback={<Spinner size="100px" />}>
        <div className="w-full h-full flex flex-col items-center justify-center relative ">
          {/* <BlogImages input={input} /> */}

          <div className="w-full h-[90%] absolute top-[2%] left-0 right-0 ">
            <CherryMarkdownEditor
              // @ts-expect-error
              post={input}
              input_string={input.content ?? ""}
              cherry_instance={cherry}
              custom_element={(cherry: Cherry | null) => {
                return (
                  <BlogEditorControls
                    cherry={cherry}
                    // @ts-expect-error
                    post={input}
                    updating={true}
                    setBlogPost={setInput}
                  />
                );
              }}
            />
          </div>
          <div className="flex flex-col  gap-1  absolute bottom-[5%] right-[2%] z-50">
{/* <NewPostModal/> */}
{/* @ts-expect-error */}
        <BlogImagesmodal input={input}/>
            <SubmitButton
              loading={update_post_mutation.isPending}
              action={() =>
                update_post_mutation.mutate({
                  id: blog_id,
                  data: {
                    ...input,
                    content: cherry.current?.getMarkdown(),
                  },
                })
              }
            />
          </div>
        </div>
      </ClientSuspense>
    </div>
  );
}
