import { useFormHook } from "@/components/form/useForm";
import { ScribblePostsCreate } from "@/lib/pb/db-types";
import { randomImageURL } from "@/utils/helpers/others";
import { ClientSuspense, PageProps, navigate } from "rakkasjs";
import { useScribblePostsMutation } from "../components/utils/mutation";

import { Button } from "@/components/shadcn/ui/button";
import { Loader } from "lucide-react";
import { lazy, useState } from "react";
import { ClientResponseError } from "pocketbase";

const ScribbleDetailsForm = lazy(() => import("../components/ScribbleDetailsForm"));

export default function Page({}: PageProps) {
  const [pbError, setPbError] = useState<ClientResponseError|null>(null);
  const { input, setInput } = useFormHook<ScribblePostsCreate>({
    initialValues: {
      content: "",
      title: "",
      description: "",
      series: "",
      main_post_image_url: randomImageURL(""),
      status: "DRAFT",
      tags: "",
    },
  });
  const { create_post_mutation } = useScribblePostsMutation();
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full  h-full flex flex-col items-center justify-center md:w-[60%] gap-3 p-5">
      <h1 className="text-3xl font-bold ">new scribble</h1>
      <ClientSuspense fallback={<div className="w-full min-h-[500px] flex items-center justify-center
       h-full animate-pulse bg-accent/20 rounded-lg">Loading...</div>}>
        <ScribbleDetailsForm
          // @ts-expect-error
          input={input}
          // @ts-expect-error
          setInput={setInput}
          pb_error={pbError}
        />

      </ClientSuspense>
      <Button
        onClick={() =>
          create_post_mutation.mutate(
            { data: input },
            {
              onSuccess(data, variables, context) {
                console.log({data, variables, context})
                if(data.error){
                  setPbError(data.error)
                }
                if(data.data)[
                  navigate(`/dashboard/scribble/editor/${data.data?.id}`)

                ]
              },
            },
          )
        }
      >
        {create_post_mutation.isPending ? (
          <>
            Updating <Loader className="animate-spin w-4 h-4" />
          </>
        ) : (
          "Create"
        )}
      </Button>
      </div>
    </div>
  );
}
