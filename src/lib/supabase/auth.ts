import { supabase } from "./client"

export const handleSignUp = async (email:string, password:string)=>{
    const res =  supabase.auth.signUp({
      email,
      password,
    });
    return res;
}

export const handleSignIn = async (email:string, password:string)=>{
    const res =  supabase.auth.signInWithPassword({
      email,
      password,
    });
    return res;
}

export const verifyRole = async (role:string)=>{
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (user?.user_metadata?.role !== role) {
      await supabase.auth.signOut();
      return false;
    } else {
      return true;
    }    
}