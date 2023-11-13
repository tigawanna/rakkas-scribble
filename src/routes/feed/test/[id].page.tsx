import { Spinner } from "@/components/navigation/loaders/Spinner";
import { ScribbleUserResponse } from "@/lib/pb/db-types";
import { DevToApiClient } from "@/lib/publish/devto/client/articles";
import { tryCatchWrapper } from "@/utils/async";
import { PageProps, useSSQ } from "rakkasjs";
import { Suspense } from "react";
import { getOneDevToPost } from "../utils/posts";
export default function Page({ params }: PageProps) {
  const delay = parseInt(params.id);
  //  a promise that resolevs after the delay
  // const delayPromise = (delay: number): Promise<void> => {

  // };
  const query = useSSQ(async (ctx) => {
    const user = ctx.locals.pb?.authStore.model as ScribbleUserResponse;
    if (user.keys?.devto?.key) {
      return tryCatchWrapper(getOneDevToPost({ ctx, id: "1658852" }));
    }

    return { name: user?.username + " Subject " + delay, age: delay };
    // console.log("ctx",ctx.locals)
    //   const user = await ctx.locals.pb
    //     ?.collection("scribble_user")
    //     .authRefresh<ScribbleUserResponse>();
    // return { name: user?.record?.username + "Subject " + delay, age: delay };

    // await new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, delay * 1000);
    // });
  });
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <div className="w-[80%]">
        <h1 className="text-7xl font-bold">TEST New Page</h1>
        <Suspense fallback={<Spinner size="60px" />}>
          <h3 className="text-8xl font-semibold break-words">
            {query.data?.name}
          </h3>
          <div className="text-4xl text-accent">{query.data?.age}</div>
        </Suspense>
      </div>
    </div>
  );
}
