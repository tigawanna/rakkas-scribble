import { CherryOptions } from "cherry-markdown/dist/types/Cherry";
import { CherryTypes } from "./types";

export function cherryMarkdwnConfig(): Partial<CherryTypes["options"]> {
  return {
    fileUpload: (file, callback) => {
      console.log("fileUpload", file);
    },
  };
}
