import { UserType } from "../types";
import { supabase } from "./client"

export const handleSignUp = async (email: string, password: string, name: string, role:UserType) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error)  throw new Error("Signup failed") ;

  if (data.user) {
    const { error: insertError } = await supabase.from("profiles").insert({
      id: data.user.id,
      name,
      role,
    });

    if (insertError) throw new Error("Unexpected error occured");
  }

  return { data };
};


export const handleSignIn = async (email:string, password:string)=>{
    const res =  supabase.auth.signInWithPassword({
      email,
      password,
    });
    return res;
}

export const verifyRole = async (expectedRole: UserType) => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return false;
  }
  
  const { data: profile, error: profileError } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", user.id)
  .single();
  
  if (profileError || !profile) {
    return false;
  }
  console.log(expectedRole,"exp",profile,profile.role)

  if (profile.role !== expectedRole) {
    await supabase.auth.signOut();
    return false;
  }

  return true;
};
