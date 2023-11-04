import { useFormHook } from "@/components/form/useForm";
import { Spinner } from "@/components/navigation/loaders/Spinner";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { ClientSuspense, usePageContext, useQuery } from "rakkasjs";
import { lazy } from "react";
const CherryMarkdownEditor = lazy(
  () => import("@/components/editor/CherryMarkdownEditor"),
);

interface EditBlogProps {
    blog_id:string
}

type BlogFormInput = Omit<ScribblePostsResponse,"id"|"created"|"updated">
export function BlogEditor({blog_id}:EditBlogProps){
    const page_ctx = usePageContext();
    const query = useQuery("blog" + blog_id, () => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("scribble_posts").getOne(blog_id),
      );
    });
const data = query.data.data
const {input,setInput} = useFormHook<BlogFormInput>({initialValues:{
content:data?.content,
title:data?.title,
contentMarkdown:data?.contentMarkdown,
devToArticleCoverImagePath:data?.devToArticleCoverImagePath,
devToArticleId:data?.devToArticleId,
devToBlogUrl:data?.devToBlogUrl,
hashNodeArticleCoverImagePath:data?.hashNodeArticleCoverImagePath,
hashNodeArticleId:data?.hashNodeArticleId,
hashNodeBlogUrl:data?.hashNodeBlogUrl,
last_published_at:data?.last_published_at,
mediumArticleId:data?.mediumArticleId,
mediumBlogUrl:data?.mediumBlogUrl,
post_media:data?.post_media,
publishingDetails:data?.publishingDetails,
status:data?.status,
tags:data?.tags,
user_id:data?.user_id,
}})

console.log({input})


return (
  <div className="w-full h-full flex items-center justify-center">
    <ClientSuspense fallback={<Spinner size="100px" />}>
      <div
        className="flex min-h-screen  flex-col h-full items-center justify-center gap-1 w-full "
      >
        <CherryMarkdownEditor
          input_string={input.content??""}
          // custom_element={(cherry: Cherry | null) => {
          //   return (
          //     <CoverLetterEditorControls
          //     cherry={cherry}
          //     application_input={application_input}
          //     updating={updating}
          //     setCoverLetter={setCoverLetter}
          //   />
          //   );
          // }}
        />
      </div>
    </ClientSuspense>
  </div>
);
}
