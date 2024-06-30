import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

// const { data: users } = await supabase.from("Users").select("Json");
// let users_ld = [];
// users.forEach((user) => {
//   users_ld.push(user.Json);
// });
// console.log(users_ld);
// export { users_ld };
