import { Tabs, Tab } from "@nextui-org/tabs";
import Leaderboard from "../../../components/leaderboard";
import Providers from "../../../components/themeProvider";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { useWindowSize } from "../../../components/windowSize";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase.mjs";
import { useRouter } from "next/navigation";
import { AppContext } from "/src/context/AppContext";

const random = (min, max) => Math.round(Math.random() * (max - min + 1) - min);

const Result_mobileUI = ({ result, username, category, showResult, score, setScore }) => {
  const [selected, setSelected] = useState("photos");
  const router = useRouter();
  const ReStart = () => {
    router.push("/");
    router.refresh();
    showResult(false);
    setScore(0);
  };
  return (
    <Providers>
      <div className={result ? "result  h-screen overflow-hidden" : "hidden"}>
        <h1 className="heading p-1 scale-95 rounded-md mt-5">Qzap</h1>
        <div className="grid w-full">
          <Tabs
            variant="underlined"
            selectedKey={selected}
            className="place-content-center"
            onSelectionChange={setSelected}
          >
            <Tab key="photos" title="Result">
              <div className=" scale-95 result mt-16">
                <div className="details text-center p-10 rounded-md">
                  <h1 className="text-4xl font-medium mb-10">Your score</h1>
                  <div className="text-4xl">{score}/10</div>
                  <div className="text-xl mt-10">
                    {score >= 5 ? (
                      <div>
                        Congrats <b>{username} </b>on completing the <b>{category}</b> quiz!!
                        <br />
                        <Button color="primary" variant="solid" size="lg" className="mt-10" onClick={() => ReStart()}>
                          Play again!
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button color="primary" variant="solid" size="lg" className="mt-10" onClick={() => ReStart()}>
                          Try again!
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab key="music" title="Ranking">
              <div className="mt-20 scale-95 ">
                <div className="leaderboard rounded-md flex flex-col justify-center items-center ">
                  <h2 className="text-3xl font-bold mb-5 text-center mt-3">Leaderboard</h2>
                  <table className="border-separate border-spacing-x-1 text-large p-5 text-center ">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Category</th>
                      </tr>
                    </thead>
                    <tbody className="p-5">
                      <Leaderboard />
                    </tbody>
                  </table>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </Providers>
  );
};

const Result_lapUI = ({ result, username, category, setActive, showResult, score, setScore }) => {
  const router = useRouter();
  const ReStart = () => {
    router.push("/");
    router.refresh();
    showResult(false);
    setScore(0);
  };
  return (
    <Providers>
      <div className={result ? "result  h-screen overflow-hidden" : "hidden"}>
        <div className="grid w-screen grid-cols-2 grid-rows-10 h-screen place-content-center ">
          <h1 className="heading scale-95 row-start-1 col-span-2 max-h-20 row-span-1 rounded-md mt-5 p-1">Qzap</h1>
          <div className="scale-95 p-5 row-start-3">
            <div className="details text-center p-12 rounded-md">
              <h1 className="text-4xl font-medium mb-10">Your score</h1>
              <div className="text-4xl">{score}/10</div>
           
              <div className="text-xl mt-20">
                {score >= 5 ? (
                  <div className="text-3xl">
                    Congrats {username} on completing the {category} quiz!!
                    
                    <Button color="primary" variant="solid" size="lg" onClick={() => ReStart} className="mt-10">
                      Play again!
                    </Button>
                  </div>
                ) : (
                  <div className="text-3xl">
                    <Button color="primary" variant="solid" size="lg" onClick={() => ReStart} className="mt-10">
                      Try again!
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="scale-95 p-6 row-start-3">
            <div className="leaderboard flex justify-center items-center flex-col p-6">
              <h2 className="text-3xl font-bold mb-5">Leaderboard</h2>
              <table className="border-separate border-spacing-x-5 text-2xl rounded-md w-max ">
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
          </div>
        </div>
      </div>
    </Providers>
  );
};

const Result = ({ result, username, category, setActive, showResult }) => {
  let size = useWindowSize();
  let { score, setScore } = useContext(AppContext);

  useEffect(() => {
    async function submitUser() {
      const { error } = await supabase.from("Users").insert({
        id: random(10, 10000),
        Json: { username: username, category: category, score: score },
      });
      console.log(error);
    }
    return () => {
      submitUser();
    };
  }, [username, category, score, setScore]);

  return (
    <>
      {size.width > 1000 ? (
        <>
          <Result_lapUI
            result={result}
            username={username}
            category={category}
            setActive={setActive}
            showResult={showResult}
            setScore={setScore}
            score={score}
          />
        </>
      ) : (
        <Result_mobileUI
          result={result}
          username={username}
          category={category}
          setActive={setActive}
          setScore={setScore}
          showResult={showResult}
          score={score}
        />
      )}
    </>
  );
};

export default Result;
