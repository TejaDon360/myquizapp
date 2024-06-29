import { supabase } from "../../utils/supbase";

export default async function Leaderboard() {
  const { data: users } = await supabase.from("Users").select();
  let usersq = [];
  users.forEach((user) => {
    usersq.push(user.Json);
  });
  const leaderboard = usersq.map((val, i) =>
    i < 6 ? (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{val.username}</td>
        <td>{val.score}</td>
        <td>{val.category}</td>
      </tr>
    ) : (
      <></>
    )
  );
  //   const { data: users } = await supabase.from("Users").select("Json");
  //   console.log({ users });
  return <>{leaderboard}</>;
}

// //pre render at build time
// export const getStaticProps = async () => {
//   const { data: users } = await supabase.from("Users").select("Json");
//   return {
//     props: {
//       users,
//     },
//   };
// };
