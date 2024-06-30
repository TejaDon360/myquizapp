import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.mjs";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: users } = await supabase.from("Users").select("Json");
        setData(users);
      } catch (err) {}
    };
    return () => {
      fetchData();
    };
  }, []);
  let usersq = new Set();
  data.forEach((user) => {
    usersq.add(user.Json);
  });

  let users = [];
  usersq.values().forEach((val) => {
    users.push(val);
  });
  users = users.sort((a, b) => b.score - a.score);
  const leaderboard = users.map((val, i) =>
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

  return <>{leaderboard}</>;
}
