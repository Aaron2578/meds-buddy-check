import { UserType } from "@/lib/types"
import { SignInForm } from "./SignInForm"
import { SignupForm } from "./SignupForm"


export function AuthForm({role}:{role:UserType}) {


  return (
    <>
        <SignInForm role={role}/>
        <SignupForm role={role}/>
    </>
  )
}