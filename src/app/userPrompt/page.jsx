"use client";

import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useRouter } from "next/navigation";
import Providers from "../../../components/themeProvider";

import Logo from "../../../components/logo"

export default function UserPrompt() {
  let router = useRouter();
  const { username, setName, category, setCat } = useContext(AppContext);
  const submitNameAndCategory = (e, n, c) => {
    console.log(username, category);
    router.push("../quiz");
  };
  return (
    <Providers>
      <div className="flex justify-center items-center h-screen mx-5">
     
        <div className="prompt  p-5 flex flex-col w-full max-w-96 rounded-md ">
          <h1 className="text-2xl font-bold text-center mb-2"><Logo></Logo>Qzap</h1>
          <p className="text-sm mb-2 text-center">Enter your username and select a category to begin.</p>
          <label htmlFor="username" className="my-1">
            Username
          </label>
          <input
            type="string"
            id="username"
            className="username input p-4 mb-2 rounded-md"
            value={username}
            onInput={(e) => setName(e.target.value)}
          ></input>
          <label htmlFor="category" className="my-1">
            Category
          </label>
          <select
            type="select"
            id="category"
            className="username input p-4 rounded-md"
            value={category}
            onChange={(e) => setCat(e.target.value)}
          >
            <option value="math">Math</option>
            <option value="tricky">Tricky</option>
            <option value="gk">General knowledge</option>
          </select>

          <button
            className={username.length >= 5 ? "start_quizBtn p-3 mt-5 rounded-md" : "disabled p-3 mt-5 rounded-md"}
            onClick={() =>
              (username.length >= 5) ? submitNameAndCategory(name, category) : console.log("enter username")
            }
          >
            Start Quiz
          </button>
          <p className="mt-2 opacity-75 text-sm text-right">Provide username to start the quiz or signup?</p>
        </div>
      </div>
    </Providers>
  );
}
