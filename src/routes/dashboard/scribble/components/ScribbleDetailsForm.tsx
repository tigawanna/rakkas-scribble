import { ThePicUrlInput } from "@/components/form/ThePicUrlInput";
import { TheStringListInput } from "@/components/form/inputs/StringListInput";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { PbTheImagePicker } from "@/lib/pb/components/form/PbTheImagePicker";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { randomImageURL } from "@/utils/helpers/others";
import { ClientResponseError } from "pocketbase";


interface ScribbleDetailsFormProps {
  scribble?: ScribblePostsResponse|null;
  pb_error?: ClientResponseError | null;
  input: Partial<ScribblePostsResponse>;
  setInput: React.Dispatch<
    React.SetStateAction<Partial<ScribblePostsResponse>>
  >;
}


export default function ScribbleDetailsForm({input,scribble,setInput,pb_error}:ScribbleDetailsFormProps){
return (
  <div className="w-full h-full flex flex-col  gap-2 p-2">
    <PbTheTextInput
      field_key={"title"}
      field_name={"title"}
      label_classname="text-accent"
      pb_error={pb_error}
      value={input.title}
      onChange={(e) => {
        setInput((prev) => ({ ...prev, title: e.target.value }));
      }}
    />
    <PbTheTextAreaInput
      field_key={"description"}
      field_name={"description"}
      label_classname="text-accent"
      pb_error={pb_error}
      className="min-h-[150px]"
      value={input.description}
      onChange={(e) => {
        setInput((prev) => ({ ...prev, description: e.target.value }));
      }}
    />
    <div className="w-full py-2 flex flex-col items-center gap-2">
      {import.meta.env.PROD && (
        <div className="w-full">
          <PbTheImagePicker
            label={"upload image"}
            collection_id_or_name="scribble_posts"
            record_id={input.id}
            file_name={input.main_post_image}
            setFileImage={(file) => {
              // @ts-expect-error
              setInput((prev) => ({ ...prev, main_post_image: file }));
            }}
          />
        </div>
      )}

      <div className="w-full">
        <p className="text-accent ">add image URL </p>
        <ThePicUrlInput
          img_url={randomImageURL(input.main_post_image_url)}
          className="justify-center"
          editing
          setInputImage={(url) => {
            if (url) {
              setInput((prev) => ({
                ...prev,
                main_post_image_url: url,
              }));
            }
          }}
        />
      </div>
    </div>

    <TheStringListInput
      editing={true}
      label_classname="text-accent"
      field_key={"tags"}
      field_name={"tags"}
      value={input.tags}
      placeholder="tag1, tag2, tag3"
      input={input}
      setInput={setInput}
    />
    <PbTheTextInput
      field_key={"series"}
      field_name={"series"}
      pb_error={pb_error}
      label_classname="text-accent"
      value={input.series}
      onChange={(e) => {
        setInput((prev) => ({ ...prev, series: e.target.value }));
      }}
    />
  </div>
);
}
