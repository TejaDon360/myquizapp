"use client";

import { use, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useWindowSize } from "../../../components/windowSize";
import Providers from "../../../components/themeProvider";
import ThemeSwitcher from "../../../components/themeSwitcher";
import Leaderboard from "../../../components/leaderboard";
import Questions from "../../../components/questions";

import { questions } from "../../../components/questions";
import Result from "../result/page";
import { supabase } from "../../../utils/supabase.mjs";

export default function QuiArea() {
  let { username, category } = useContext(AppContext);
  const [score, setScore] = useState(0);
  let size = useWindowSize();
  const [index, setIndex] = useState(0);
  const [answer, setAns] = useState("");
  const [result, showResult] = useState(false);
  const random = (min, max) => Math.round((max - min) * Math.random() + min);
  async function submitUser() {
    if (answer == questions[index].answer) {
      setScore(score + 1);
    }
    const { error } = await supabase.from("Users").insert({
      id: random(10, 10000),
      Json: { username: username, category: category, score: score },
    });
    console.log(error);
  }

  if (index > 9) {
    setIndex(9);
  }

  const submitQuiz = (u, c, s) => {
    if (questions[index]) {
      if (answer == questions[index].answer) {
        setScore(score + 1);
      }

      showResult(true);
      submitUser();
    }
  };

  const checkAnswer = () => {
    if (questions[index]) {
      if (answer == questions[index].answer) {
        setScore(score + 1);
      }

      if (index < 9) {
        setIndex(index + 1);
      }
    }
  };

  return (
    <>
      <>
        <div className={result ? "hidden" : ""}>
          {size.width > 1000 ? (
            <Providers>
              <div className="flex  items-center h-screen scale-95 overflow-hidden w-screen">
                <div className="grid grid-rows-auto grid-cols-6 gap-8 quiz_holder w-full">
                  <div className=" heading row-span-1 col-span-6 w-full max-h-20  p-3 ">
                    <div className="ml-10 grid items-center grid-cols-2">
                      <div className="justify-self-start">Qzap </div>
                      <div className="justify-self-end self-center">
                        <ThemeSwitcher />
                      </div>
                    </div>
                  </div>

                  <div className="row-span-3 row-start-2 col-start-5 col-span-2  h-fit details text-center p-5 min-w-max">
                    <h1 className="text-center text-3xl p-2 font-medium">Details</h1>
                    <div className="flex flex-col  text-xl justify-evenly">
                      <p>Category : {category} </p>
                      <p>Score : {score}</p>
                      <p>Username : {username}</p>
                    </div>
                  </div>

                  <div className="col-start-5 row-start-5 row-span-8 col-span-2 flex  flex-col h-fit p-3 leaderboard min-w-fit">
                    <h1 className="text-center text-3xl p-5 font-medium">Leaderboard</h1>
                    <table className="border-separate text-center mt-3 text-xl ">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Username</th>
                          <th>Score</th>
                          <th>Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        <Leaderboard />
                      </tbody>
                    </table>
                  </div>

                  <div className="row-span-8 row-start-2 col-start-1 col-span-4 question_container  flex flex-col w-full h-fit">
                    <div className="question_container p-10">
                      <Questions index={index} category={category} setAns={setAns} />
                    </div>
                    <button
                      className={index == 9 ? "hidden" : "p-2 btn text-2xl rounded-md min-w-48 self-center mb-10"}
                      onClick={checkAnswer}
                    >
                      Next
                    </button>
                    <button
                      className={index == 9 ? "p-2 btn text-2xl rounded-md min-w-48 self-center mb-10" : "hidden"}
                      onClick={() => submitQuiz(username, category, score)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Providers>
          ) : (
            // mobile and tablets UI
            <Providers>
              <div className="flex justify-center items-center overflow-hidden scale-95 h-screen">
                <div className="grid grid-rows-auto grid-cols-6 gap-3 quiz_holder w-screen ">
                  <div className="row-span-1 col-span-6 max-h-20 heading text-2xl h-full p-3 flex flex-row items-center justify-between">
                    Qzap
                    <div>
                      <ThemeSwitcher />
                    </div>
                  </div>

                  <div className="row-span-1 row-start-2 col-start-1 col-span-6 h-fit details text-center ">
                    <div className="grid w-full grid-cols-2 gap-2 p-3 text-large font-medium">
                      <p>Category : {category} </p>
                      <p>Username : {username}</p>
                      <p>Score : {score}</p>
                    </div>
                  </div>

                  <div className="row-span-2 row-start-3 col-start-1 col-span-6 question_container flex flex-col h-fit ">
                    <div className="question_container p-2">
                      <Questions index={index} category={category} setAns={setAns} />
                    </div>
                    <button
                      className={index == 9 ? "hidden" : "p-2 btn text-2xl rounded-md min-w-48 self-center mb-10"}
                      onClick={checkAnswer}
                    >
                      Next
                    </button>
                    <button
                      className={index == 9 ? "p-2 btn text-2xl rounded-md min-w-48 self-center mb-10" : "hidden"}
                      onClick={() => submitQuiz(username, category, score)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Providers>
          )}
        </div>
      </>
      {result ? (
        <Result score={score} result={result} username={username} category={category} showResult={showResult} />
      ) : (
        <></>
      )}
    </>
  );
  // return <div className="bg-red-900 p-2 m-2">{<h1>Hello {username} </h1>}</div>;
}
