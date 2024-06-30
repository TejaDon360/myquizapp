import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.mjs";
let usersq = [];
export default function Leaderboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: users } = await supabase.from("Users").select("Json");
        setData(users);
      } catch (err) {}
    };
    fetchData();
  }, []);

  data.forEach((user) => {
    if (!usersq.includes(user.Json)) {
      usersq.push(user.Json);
    }
  });

  usersq = usersq.sort((a, b) => b.score - a.score);

  const leaderboard = usersq.map((val, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{val.username}</td>
      <td>{val.score}</td>
      <td>{val.category}</td>
    </tr>
  ));

  return <>{leaderboard}</>;
}
