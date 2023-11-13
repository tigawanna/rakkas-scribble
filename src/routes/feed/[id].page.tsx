import { tryCatchWrapper } from "@/utils/async";
import { ClientSuspense, PageProps, useSSQ } from "rakkasjs";
import { getOneDevToPost } from "./utils/posts";

import React, { Suspense } from "react";
import { OnePost } from "./components/OnePost";
import { Spinner } from "@/components/navigation/loaders/Spinner";

const MarkdownRender = React.lazy(() => import("./components/PageMarkdown"));
export default function Page({ params }: PageProps) {
  // console.log("======== QUERY ===========",query.data)
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center gap-4 p-5">
      <OnePost post_id={params.id} />
    </div>
  );
}
