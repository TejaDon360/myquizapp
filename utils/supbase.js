import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

// const { data: users } = await supabase.from("Users").select("Json");

// console.log(users);