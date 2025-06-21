import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";
import { UserType } from "@/lib/types"
import { SignInForm } from "./SignInForm"
import { SignupForm } from "./SignupForm"


export function AuthForm({handleSuccessLogin,role}:{handleSuccessLogin: (userType: UserType) => void, role:UserType}) {
  const [isSignInForm, setIsSignInForm] = useState(true);

  return (
    <>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isSignInForm?"SignIn":"Signup"}</DialogTitle>
          </DialogHeader>
          {
            isSignInForm?
            <SignInForm handleSuccessLogin={handleSuccessLogin} role={role}/>
            :
            <SignupForm setIsSignInForm={setIsSignInForm}  role={role}/>
          }
          <p>{isSignInForm?
          <>
            Don't have an account?. <span onClick={()=>setIsSignInForm(prev=>!prev)} className="text-blue-700  font-medium cursor-pointer">Create one</span>
          </>
          :
          <>
            Already have an account?. <span onClick={()=>setIsSignInForm(prev=>!prev)} className="text-blue-700 font-semi-bold cursor-pointer">Login now</span>
          </>
          }</p>
        </DialogContent>
    </>
  )
}
