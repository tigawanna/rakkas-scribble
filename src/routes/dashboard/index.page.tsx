import { PageProps } from "rakkasjs";
import { Scribbles } from "./scribble/components/Scribbles";
import { SkeletonLoader } from "@/components/navigation/loaders/SkeletonLoader";
import { Suspense } from "react";
export default function DashboardPage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col ">
      <Suspense fallback={<SkeletonLoader items={12} />}>
        <Scribbles />
      </Suspense>
    </div>
  );
}
