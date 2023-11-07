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


interface ProvidresProps {

}

export function Providers({}:ProvidresProps){
const {page_ctx,user} = useUser()
const user_providers = user.keys?Object.entries(user.keys):[] 
return (
 <div className='w-full h-full flex flex-col sm:flex-row items-center justify-center'>
    providers
    {user_providers.map(([k,v])=>{
        return (
        <ProviderCard k={k} v={v}/>
        )
    })}

 </div>
);
}



interface ProviderCardProps{
    k:string;
    v:ScribbleApiKeys["devto"]
}

export function ProviderCard({k,v}:ProviderCardProps) {
   
   const { input,setError,setInput,handleChange}= useFormHook({initialValues:{
        key:"",
        username:""
    }})

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{k}</CardTitle>
        <CardDescription>setup your blog API</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <PbTheTextInput 
            field_key={"key"}
            field_name={k+"API key"}
            val={input.key}
            onChange={handleChange}
            />
            <PbTheTextInput 
            field_key={"username"}
            field_name={k+"User name"}
            val={input.username}
            onChange={handleChange}
            />

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
