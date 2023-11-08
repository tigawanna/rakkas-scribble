import PocketBase, { OAuth2AuthConfig } from "pocketbase";
import { GithubOauthResponse } from "./types";
import { TypedPocketBase } from "typed-pocketbase";
import { Schema, ScribbleUserCreate,ScribbleUserUpdate } from "./db-types";
import { tryCatchWrapper } from "@/utils/async";

export type PocketBaseClient = TypedPocketBase<Schema>;
const pb_url = import.meta.env.RAKKAS_PB_URL
export const pb = new PocketBase(
  pb_url,
) as TypedPocketBase<Schema>;

export async function createUser(data: ScribbleUserCreate) {
  const res = await tryCatchWrapper(pb.collection("scribble_user").create(data));
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
  return res;
}

export async function verifyUserEmail(email: string) {
  return await tryCatchWrapper(
    pb.collection("scribble_user").requestVerification(email),
  );
}

export async function emailPasswordLogin(identity: string, password: string) {
  const user  =await tryCatchWrapper(
    pb.collection("scribble_user").authWithPassword(identity, password),
  );
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
  return user
}

// export async function oauthLogin(options:OAuth2AuthConfig) {
//     return await tryCatchWrapper(pb.collection('scribble_user').authWithOAuth2(options))
// }

export async function listOAuthMethods() {
  return await tryCatchWrapper(pb.collection("scribble_user").listAuthMethods());
}

export async function triggerOuathLogin(options: OAuth2AuthConfig) {
  return await tryCatchWrapper<GithubOauthResponse>(
    pb.collection("scribble_user").authWithOAuth2(options) as any,
  );
}




export async function oneClickOauthLogin(provider: "github" | "google") {
  try {
    // const authData = await pb.collection('scribble_user').authWithOAuth2({ provider});
    const authData = await pb.collection('scribble_user').authWithOAuth2({ provider: 'github' });
  
    const dev = authData.record;
    const data: ScribbleUserUpdate = authData?.meta?.isNew?{
      github_access_token: authData.meta?.accessToken,
      github_username: authData.meta?.rawUser?.login,
      about_me: authData.meta?.rawUser?.bio,
    }:
    {
        github_access_token: authData.meta?.accessToken,
    };
  
    const updated_user =await pb.collection("scribble_user").update(dev.id, data)
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    return updated_user
  

  } catch (error) {
    throw error
  }
}




type CollectionName  = keyof Schema

export function getFileURL({collection_id_or_name,file_name,record_id}:{
  collection_id_or_name?: CollectionName,
  record_id?: string,
  file_name?: string
}){
  if(!collection_id_or_name || !file_name || !record_id){
    return ""
  }
  // http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME?thumb=100x300
  return `${pb_url}/api/files/${collection_id_or_name}/${record_id}/${file_name}`;
}
