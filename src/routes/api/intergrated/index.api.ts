import { RequestContext } from "rakkasjs";


export async function POST(ctx:RequestContext) {
    const req = ctx.request
    try {
        const { devToAPIKey, hashNodeAPIKey, hashNodeUsername, mediumAPIKey } = ({} = await req.json());
        const supabase = createRouteHandlerClient<Database>({ cookies });

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const { error } = await supabase.from("profiles").select("*").eq("userId", user.id).single();

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        let devToAccount;
        if (devToAPIKey) {
            try {
                const devToClient = new DevToApiClient(devToAPIKey);
                devToAccount = await devToClient.getAuthUser();
            } catch (err) {
                devToAccount = undefined;
            }
        }

        let hashNodeAccount;
        if (hashNodeAPIKey && hashNodeUsername) {
            try {
                const hashNodeClient = new HashNodeApiClient(hashNodeAPIKey);
                hashNodeAccount = await hashNodeClient.getAuthUser(hashNodeUsername);
            } catch (err) {
                hashNodeAccount = undefined;
            }
        }

        let mediumAccount;
        if (mediumAPIKey) {
            try {
                const mediumClient = new MediumApiClient(mediumAPIKey);
                mediumAccount = await mediumClient.getAuthUser();
            } catch (err) {
                mediumAccount = null;
            }
        }

        return NextResponse.json({
            accounts: {
                "dev.to": devToAccount,
                hashNode: hashNodeAccount,
                medium: mediumAccount,
            },
            apiKeys: {
                "dev.to": devToAPIKey,
                hashNode: hashNodeAPIKey,
                medium: mediumAPIKey,
            },
        });
    } catch (err) {
        if (err instanceof AxiosError) {
            return NextResponse.json({ message: err.message }, { status: err.response?.status || 500 });
        }
    }
}

export interface GetIntegrationStatusResponse {
    accounts: Record<BlogProviders, BlogUser | undefined>;
    apiKeys: Record<BlogProviders, string | null>;
}
