import { Loader, Sparkle, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { Button } from "@/components/shadcn/ui/button";
import { useFormHook } from "@/components/form/useForm";
import {
  Dialog,
  DialogContent,

  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import {usePageContext, useSSM } from "rakkasjs";
import { toast } from "react-toastify";
import { palmAITextStuff } from "@/lib/ai";
import { canProompt } from "@/routes/api/ai/helpers";


interface ScribbleAIModalProps {
  scribble: ScribblePostsResponse;
  input: Partial<ScribblePostsResponse>;
  setInput: React.Dispatch<
    React.SetStateAction<Partial<ScribblePostsResponse>>
  >;
}

export function ScribbleAIModal({
  scribble,
  input,
  setInput,
}: ScribbleAIModalProps) {
  const [open, setOpen] = useState(false);
  const page_ctx = usePageContext()
  const user_id = page_ctx.locals?.pb?.authStore?.model?.id
  const ai_mutation = useSSM(
    async (ctx, vars: { user_prompt: string; text_input: string }) => {
    const can_proompt = await canProompt(ctx,user_id);
      if (!can_proompt.can_proompt) {
        return {
          data: null,
          error: {
            message:
              "try again after " + can_proompt.can_proompt_after + " hours",
          },
        };
      }
      return palmAITextStuff({
        user_prompt: vars.user_prompt,
        text_input: vars.text_input,
      });
    },
  );

  const { input: promptInput, handleChange } = useFormHook({
    initialValues: {
      prompt: `Eliminate all grammatical errors and rewrite to reflect proper sentence structure , The final output should be in Markdown format`,
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="btn btn-sm flex gap-2 hover:text-accent">
          <Sparkle /> Ai Rewrite
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Scribble</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <TheTextAreaInput
            field_name="prompt"
            field_key={"prompt"}
            className="min-h-[150px]"
            value={promptInput.prompt}
            onChange={handleChange}
          />
        </div>

        <DialogFooter>
          {/* <DialogCancel>Cancel</DialogCancel> */}
          <Button
            onClick={() =>
              ai_mutation
                .mutateAsync({
                  user_prompt: promptInput.prompt,
                  text_input: scribble?.content!,
                })
                .then((res) => {
                  console.log({ res });
                  if (res.error) {
                    toast(` AI rewrite failed : ${res.error.message}`, {
                      type: "error",
                    });
                    return;
                  }
                  if (res.data) {
                    setInput((prev) => ({
                      ...prev,
                      content: res.data.output,
                    }));
                    setOpen(false);
                    toast(` AI rewrite successfully`, {
                      type: "success",
                    });
                  }
                })
            }
          >
            {ai_mutation.isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
