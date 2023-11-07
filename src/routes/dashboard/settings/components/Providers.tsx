import { ScribbleApiKeys } from "@/lib/pb/db-types";
import { useUser } from "@/lib/rakkas/hooks/useUser";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { useFormHook } from "@/components/form/useForm";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { Link } from "rakkasjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tryCatchWrapper } from "@/utils/async";
import { toast } from "react-toastify";
import { IconProps, Icons } from "@/components/icons/Iconts";
import { DeleteConfirm } from "@/components/modal/DeleteConfirm";
import { useState } from "react";
import { Edit, Loader } from "lucide-react";

interface ProvidresProps {}

export function Providers({}: ProvidresProps) {
  const { page_ctx, user } = useUser();

  const user_providers = [
    {
      name: "devto",
      key: user?.keys?.devto?.key,
      username: user?.keys?.devto?.username,
      linkUrl: "https://dev.to/settings/extensions",
      description:
        "Dev.to is a place where coders share, stay up-to-date and grow their careers.",
      apiKeyName: "devToAPIKey",
      icon:Icons.devto
    },
    {
      name: "hashnode",
      key: user?.keys?.hashnode?.key,
      username: user?.keys?.hashnode?.username,
      linkUrl: "https://hashnode.com/settings/developer",
      secondaryLinkUrl: "https://hashnode.com/settings",
      description: "Everything you need to start blogging as a developer!",
      apiKeyName: "hashNodeAPIKey",
      icon:Icons.hashnode
    },
    {
      name: "medium",
      key: user?.keys?.medium?.key,
      username: user?.keys?.medium?.username,
      linkUrl: "https://medium.com/me/settings",
      description: "Medium is a place to write, read, and connect.",
      apiKeyName: "mediumAPIKey",
      icon:Icons.medium
    },
  ];
  return (
    <div className="w-full h-full gap-2 flex flex-col items-center justify-between">
      <h3 className="text-3xl font-bold">Publishing Platforms </h3>
      <div className="w-full h-full gap-5 p-5 flex flex-col md:flex-row items-center justify-center">
        {user_providers.map((item) => {
          return <ProviderCard provider={item} />
        })}
      </div>
    </div>
  );
}

interface ProviderCardProps {
  provider:
    | {
        name: string;
        key: string | undefined;
        username: string | undefined;
        linkUrl: string;
        description: string;
        apiKeyName: string;
        secondaryLinkUrl?: undefined;
        icon: (props: IconProps) => JSX.Element;
      }
    | {
        name: string;
        key: string | undefined;
        username: string | undefined;
        linkUrl: string;
        description: string;
        apiKeyName: string;
        icon: (props: IconProps) => JSX.Element;
      };
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const { page_ctx, user } = useUser();
    const qc = useQueryClient();
  const [editing, setEditing] = useState((!provider?.key||(provider?.key && provider.key.length<2))?true:false);
  const { input, setError, setInput, handleChange } = useFormHook({
    initialValues: {
      key: provider.key,
      username: provider.username,
    },
  });
  const mutation = useMutation({
    mutationFn: () => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("scribble_user").update(user.id, {
          keys: {
            ...user.keys,
            [provider.name]: input,
          },
        }),
      );
    },
    onSuccess(data) {
      if (data.data) {
        qc.invalidateQueries({ queryKey: ["scribble_user"] });
                  setEditing(false);
        toast("token updated successfully", { type: "success" });
      }
      if (data.error) {
        toast(data.error.message, { type: "error" });
      }
    },
    onError(error: any) {
      toast(error.message, { type: "error" });
    },
  });
  const delete_mutation = useMutation({
    mutationFn: () => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("scribble_user").update(user.id, {
          keys: {
            ...user.keys,
            [provider.name]: undefined,
          },
        }),
      );
    },
    onSuccess(data) {
      if (data.data) {
          qc.invalidateQueries({ queryKey: ["scribble_user"] });
          setEditing(false);
        toast("token deleted successfully", {
          type: "success",
          autoClose: false,
        });
      }
      if (data.error) {
        toast(data.error.message, { type: "error" });
      }
    },
    onError(error: any) {
      toast(error.message, { type: "error" });
    },
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center w-full justify-between">
        <CardTitle className="flex gap-5 items-center first-letter:uppercase">
          <provider.icon className="w-10 h-10" />
          <h2 className="first-letter:uppercase">{provider.name}</h2>
          <Edit
            onClick={() => setEditing(!editing)}
            className="md:tooltip-open md:tooltip-top hover:text-accent"
            data-tip="update key"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <PbTheTextInput
                placeholder="your API key"
                container_classname="gap-0.5"
                label_classname="text-sm text-accent"
                field_key={"key"}
                editing={editing}
                field_name={
                  <div className="flex flex-col gap-1 text-sm">API key</div>
                }
                val={input.key}
                onChange={handleChange}
              />
              <div className="flex gap-1">
                <Link
                  target="_blank"
                  href={provider.linkUrl}
                  className="text-xs font-bold text-accent hover:text-info underline"
                >
                  click here
                </Link>
                <p className="text-xs ">to get your api key</p>
              </div>
            </div>
            {"secondaryLinkUrl" in provider && (
              <div className="flex w-full flex-col gap-1">
                <PbTheTextInput
                  placeholder={"your "+provider.name+" username"}
                  label_classname="text-sm text-accent first-letter:uppercase"
                  field_key={"username"}
                  editing={editing}
                  field_name={provider.name + " User name"}
                  val={input.username}
                  onChange={handleChange}
                />
                {
                  <div className="flex gap-1">
                    <Link
                      target="_blank"
                      href={provider.secondaryLinkUrl}
                      className="text-xs font-bold hover:text-info text-accent underline"
                    >
                      click here
                    </Link>
                    <p className="text-xs ">to check your username</p>
                  </div>
                }
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button className="btn btn-sm flex gap-2" onClick={() => mutation.mutate()}>
          Update {mutation.isPending&&<Loader className="animate-spin"/>}
        </button>
        <DeleteConfirm
          handleDelete={() => {
            delete_mutation.mutate();
          }}
          is_loading={delete_mutation.isPending}
          modal_id="delete_provider_id"
        />
        {/* <button
          className="btn btn-error btn-sm"
          onClick={() => delete_mutation.mutate()}
        >
          Delete
        </button> */}
      </CardFooter>
    </Card>
  );
}
