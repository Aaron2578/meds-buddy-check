import { UserType } from "../types";
import { supabase } from "./client"

export const handleSignUp = async (email: string, password: string, name: string, role:UserType) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { error };

  if (data.user) {
    const { error: insertError } = await supabase.from("profiles").insert({
      id: data.user.id,
      name,
      role,
    });

    if (insertError) return { error: insertError };
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

  if (profile.role !== expectedRole) {
    await supabase.auth.signOut();
    return false;
  }

  return true;
};
