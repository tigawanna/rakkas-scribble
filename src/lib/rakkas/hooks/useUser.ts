
import { ScribbleUserResponse } from "@/lib/pb/db-types";
import { useMutation, useQueryClient } from "rakkasjs";
import { usePageContext } from "rakkasjs";

export function useUser() {
    const page_ctx = usePageContext()
    const qc = useQueryClient()
    const locals = page_ctx.locals
    
//     async function logoutUser()[
// return new Promise((resolve,reject)=>{
//     locals.pb?.authStore.clear();
//     document.cookie = locals.pb?.authStore.exportToCookie({ httpOnly: false });
//     resolve(null)
// }
//     ]

    const clearAuthStore = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    page_ctx.locals.pb?.authStore.clear();
                    document.cookie = locals.pb?.authStore.exportToCookie({ httpOnly: false });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, 4000);
        });
    };

    const mutation = useMutation(async()=>{return await clearAuthStore()},{
        onSuccess: () => {
            qc.invalidateQueries("scribble_user")
            window?.location && window?.location.reload();
        }
    })
    
    const user = page_ctx.locals?.pb.authStore.model as ScribbleUserResponse
    return { user, user_mutation: mutation, page_ctx,loggout:mutation.mutate }
}
