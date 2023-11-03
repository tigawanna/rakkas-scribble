import { startClient } from "rakkasjs";
import { TypedPocketBase } from "typed-pocketbase";
import PocketBase from "pocketbase";
import { Schema } from "./lib/pb/db-types";

startClient({
	hooks: {
		beforeStart() {
			// Do something before starting the client
		},
		extendPageContext(ctx) {
       if (!ctx.locals.pb) {
         ctx.locals.pb = new PocketBase(
           import.meta.env.RAKKAS_PB_URL,
         ) as TypedPocketBase<Schema>;
         ctx.locals.pb?.authStore.onChange(() => {
           ctx.requestContext?.setCookie?.(
             "set-cookie",
             ctx.locals.pb?.authStore.exportToCookie(),
           );
         });
       }
		},
		wrapApp(app) {
			// Wrap the Rakkas application in some provider
			// component (only on the client).
			return app
		},
	},
	defaultQueryOptions: {
		// Global defaults for `useQuery` options
	},
});
