import { PageProps } from "rakkasjs";
import { PostsList } from "./components/PostsList";
import { Suspense } from "react";
import { Spinner } from "@/components/navigation/loaders/Spinner";
export default function DevToFeedPage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <Suspense fallback={<Spinner size="60px" />}>
        <PostsList />
      </Suspense>
    </div>
  );
}
