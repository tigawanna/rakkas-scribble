import { ScribbleUserUpdate } from "@/lib/pb/db-types";
import { ProfileImage } from "./profile-sections/ProfileImage";
import { tryCatchWrapper } from "@/utils/async";
import { PBReturnedUseQueryError } from "@/components/error/PBReturnedUseQueryEror";
import { useState } from "react";
import { ProfileDetails } from "./profile-sections/ProfileDetails";
import { Edit, Loader, Save } from "lucide-react";
import { TheCountryFields } from "@/components/form/TheCountryFields";
import { toast } from "react-toastify";
import { getFileURL, pb } from "@/lib/pb/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheStringListInput } from "@/components/form/inputs/StringListInput";
import { useUser } from "@/lib/rakkas/hooks/useUser";
import { isString } from "@/utils/helpers/string";

interface ProfileComponentProps {}

export function ProfileComponenst({}: ProfileComponentProps) {
  const qc = useQueryClient();
  const { user } = useUser();
  const id = user?.id;
  const [editing, setEditing] = useState(false);

  const query = useQuery({
    queryKey: ["scribble_user", id],
    queryFn: () =>
      tryCatchWrapper(pb.collection("scribble_user").getOne(id ?? "")),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const profile = query.data?.data;

  const [input, setInput] = useState<ScribbleUserUpdate>({
    username: profile?.username,
    github_username: profile?.github_username ?? "",
    linkedin_username: profile?.linkedin_username ?? "",
    about_me: profile?.about_me ?? "",
    avatar: profile?.avatar,
    email: profile?.email,
    country: profile?.country ?? "",
    city: profile?.city ?? "",
    langauges: profile?.langauges ?? "",
    phone: profile?.phone ?? "",
  });
  const mutation = useMutation({
    mutationFn: async (vars: ScribbleUserUpdate) => {
      return tryCatchWrapper(
        pb.collection("scribble_user").update(id ?? "", vars),
      );
    },

    onSuccess: (res) => {
      if (res.data) {
        toast("profile updated successfully", { type: "success" });
        qc.invalidateQueries({ queryKey: ["scribble_user", id] });
        setEditing(false);
        // startTransition(() => {
        // })
      }
      if (res.error) {
        toast(res.error.message, { type: "error", autoClose: false });
      }
    },
    onError: (err: any) => {
      toast(err?.message, { type: "error", autoClose: false });
    },
  });

  const response = query.data;
  const avatar_url = getFileURL({
    collection_id_or_name: "scribble_user",
    file_name: profile?.avatar,
    record_id: id,
  });
  return (
    <div className="w-full h-full flex flex-col items-center  px-4 ">
      {response?.error && <PBReturnedUseQueryError error={response.error} />}
      {!response?.data?.verified && (
        <div className="text-sm bg-error/20 text-error sticky top-10 p-1">
          ⚠ unverified emails have read-only access
        </div>
      )}
      <div className="flex items-center justify-end gap-1  p-1 w-full sticky top-10">
        {editing && (
          <button title="save changes" className="btn btn-sm ">
            {mutation.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <Save
                onClick={() => mutation.mutate(input)}
                className="h-7 w-7"
              />
            )}
          </button>
        )}
        <button
          title={editing ? "stop editing" : "toggle editing"}
          className={editing ? "btn btn-sm text-accent" : "btn btn-sm"}
        >
          <Edit onClick={() => setEditing((prev) => !prev)} />
        </button>
      </div>

      {response?.data && (
        <div className="w-full  flex flex-col  gap-10  p-1  mb-5 sm:px-5 ">
          <div className="w-full flex flex-col md:flex-row gap-5  justify-between ">
            <div className="min-w-[250px] w-full md:w-[25%]">
              <ProfileImage
                avatar_url={avatar_url}
                file_name={response?.data?.avatar}
                record_id={response?.data?.id}
                editing={editing}
                setEditing={setEditing}
                setInput={setInput}
              />
            </div>

            <div className="w-full  flex flex-col   p-1  gap-2 ">
              {/* email, username , github_username , linkedin_username */}
              <ProfileDetails
                profile={response?.data}
                editing={editing}
                input={input}
                setInput={setInput}
              />
              {/* country , city , phone */}
              <TheCountryFields
                editing={editing}
                country={{
                  city: input.city ?? "",
                  country: input.country ?? "",
                  phone: input.phone ?? "",
                }}
                setInput={(value) =>
                  setInput((prev) => {
                    return {
                      ...prev,
                      country: value.country,
                      phone: value.phone,
                      city: value.city,
                    };
                  })
                }
              />
            </div>
          </div>
          {/* langiages soken */}
          {isString(input.langauges) &&
          <div className="w-full flex flex-wrap gap-5  ">
            <TheStringListInput
              editing={editing}
              field_name="Languages Spoken"
              field_key="langauges"
              input={input}
              setInput={setInput}
            />
          </div>

          }

          {/* about_me */}
          <div className="w-full h-full flex flex-col  md:flex-row items-center 
           p-1  gap-5">
            <TheTextAreaInput
              container_classname="lg:max-w-[70%] lg:max-w-[60%] gap-2 text-base font-serfif"
              
              className="min-h-[180px]"
              field_key={"about_me"}
              value={input["about_me"]}
              // input={input}
              field_name={"About Me"}
              onChange={(e) => {
                setInput((prev) => {
                  return {
                    ...prev,
                    about_me: e.target.value,
                  };
                });
              }}
              label_classname="hidden"
              editing={editing}
            />
            {editing && (
              <button
                title="save changes"
                className="btn p-1 px-3  w-fit"
              >
                <Save onClick={() => mutation.mutate(input)} className="" />
                Save Changes
                {mutation.isPending && <Loader className="animate-spin" />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
