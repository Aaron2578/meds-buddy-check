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
import { handleSignUp } from "@/lib/supabase/auth"
import { toast } from "sonner"
const signupFormSchema = z.object({
  email: z.string().email("Invalid E-mail"),
  password:z.string().min(10,"Password must atleast 10 character"),
  name:z.string().min(5,"Name must atleast 5 character")
})

export function SignupForm({role}:{role:UserType}) {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password:"",
      name:"",
    },
  })
 

 const  onSubmit = async (values: z.infer<typeof signupFormSchema>)=> {
    const {email,password,name} = values;
    try{
        const res  = await handleSignUp(email,password,name,role);
        console.log(res)
        toast.success("Signin Success",{position:"top-right"})
    }catch(err){
        console.log(err);
        toast.error("Signup Failed",{position:"top-right"})
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
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