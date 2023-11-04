import { CherryTypes } from "@/components/editor/utils/types";
import { PocketBaseClient } from "@/lib/pb/client";

/**
  * Upload file function
  * @param file file object of uploaded file
  * @param callback callback function. The callback function receives two parameters. The first parameter is the URL after the file is uploaded. The second parameter is optional and is additional configuration information.
  */

type FileUploderParsm = Parameters<CherryTypes["options"]["fileUpload"]>
interface CherryPBfileUploadParameters {
post_id:string;    
pb:PocketBaseClient;
file:FileUploderParsm[0];
callback:FileUploderParsm[1];
}

export async function cherryPBfileUpload({post_id,pb,callback,file}:CherryPBfileUploadParameters){
try {
await pb.collection("scribble_posts").update(post_id, {
    
})
} catch (error) {
    
}
}

// function myFileUpload(file, callback) {
//     // First upload the file to the server. The specific code for uploading the file needs to be implemented by yourself.
//     putFile(file, function (err, url) {
//         if (err) {
//             // upload failed
//         } else {
//             callback(url);
//         }
//     });
// }
