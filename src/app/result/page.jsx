import { Tabs, Tab } from "@nextui-org/tabs";
import Leaderboard from "../../../components/leaderboard";
import Providers from "../../../components/themeProvider";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { useWindowSize } from "../../../components/windowSize";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase.mjs";
import { useRouter } from "next/navigation";

const Result_mobileUI = ({ result, username, category, showResult, score }) => {
  const ReStart = () => {
    const router = useRouter();
    router.push("/");
    showResult(false);
  };

  const [selected, setSelected] = useState("photos");

  return (
    <Providers>
      <div className={result ? "result  h-screen overflow-hidden" : "hidden"}>
        <h1 className="heading p-1 scale-95">Qzap</h1>
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
                        <Link href={"./"}>
                          <Button color="primary" variant="solid" size="lg" className="mt-10" onClick={ReStart}>
                            Play again!
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <Link href={"./"}>
                          <Button color="primary" variant="solid" size="lg" className="mt-10" onClick={ReStart}>
                            Try again!
                          </Button>
                        </Link>
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

const Result_lapUI = ({ result, username, category, setActive, showResult, score }) => {
  const ReStart = () => {
    setActive(false);
    showResult(false);
  };

  return (
    <Providers>
      <div className={result ? "result  h-screen overflow-hidden" : "hidden"}>
        <div className="grid w-screen grid-cols-2 grid-rows-10  gap-1 h-screen place-content-center">
          <h1 className="heading p-1 scale-95 row-start-1 col-span-2 max-h-20 row-span-1">Qzap</h1>
          <div className="scale-95 p-5 row-start-3">
            <div className="details text-center p-12 rounded-md">
              <h1 className="text-4xl font-medium mb-10">Your score</h1>
              <div className="text-4xl">{score}/10</div>
              <div className="text-xl mt-20">
                {score >= 5 ? (
                  <div className="text-3xl">
                    Congrats {username} on completing the {category} quiz!!
                    <Link href={"./"}>
                      <Button color="primary" variant="solid" size="lg" onClick={ReStart}>
                        Play again!
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-3xl">
                    <Link href={"./"}>
                      <Button color="primary" variant="solid" size="lg" onClick={ReStart}>
                        Try again!
                      </Button>
                    </Link>
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

const Result = ({ result, username, category, setActive, showResult, score }) => {
  let size = useWindowSize();
  useEffect(() => {
    const random = (min, max) => Math.round((max - min) * Math.random() + min);
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
  }, [username, category, score]);

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
            score={score}
          />
        </>
      ) : (
        <Result_mobileUI
          result={result}
          username={username}
          category={category}
          setActive={setActive}
          showResult={showResult}
          score={score}
        />
      )}
    </>
  );
};

export default Result;
