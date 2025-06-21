import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserType } from "@/lib/types"
import { handleSignIn, verifyRole } from "@/lib/supabase/auth"
import { toast } from "sonner"

const signInFormSchema = z.object({
  email: z.string().email("Invalid E-mail"),
  password:z.string().min(10,"Password must atleast 10 character"),
})

export function SignInForm({handleSuccessLogin,role}:{handleSuccessLogin: (userType: UserType) => void,role:UserType}) {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password:"",
    },
  })
 

 const  onSubmit = async (values: z.infer<typeof signInFormSchema>)=> {
    const {email,password} = values;
    try{
        const res  = await handleSignIn(email,password);
        console.log(res)
        const isRoleVerifySuccess = await verifyRole(role);
        if(isRoleVerifySuccess){
          toast.success("Signin Success",{position:"top-right"});
          handleSuccessLogin(role);
        }else{
          toast.error("Signin Failed",{position:"top-right",style:{background:"red",color:"white"}});
        }
    }catch(err){
        console.log(err);
        toast.error("Signin Failed",{position:"top-right",style:{background:"red",color:"white"}});
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
            <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                <Input placeholder="Enter E-mail" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                <Input placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}