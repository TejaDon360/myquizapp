import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.mjs";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { useWindowSize } from "../components/windowSize";
let questions = [];
export default function Questions({ category, index , setAns}) {
  const [data, setData] = useState([]);
  let size = useWindowSize();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: questions } = await supabase.from("Questions").select();
        setData(questions);
      } catch (err) {}
    };
    fetchData();
  }, []);
  data.forEach((question) => {
    questions.push(question[category]);
  });
  if (questions[index]) {
    const quests_mobile = (
      <ul className="text-xl p-2">
        <li className="font-semibold mb-5">
          Q.{index + 1} {questions[index].question}
        </li>
        <RadioGroup onValueChange={setAns}>
          {questions[index].options.map((val, i) => {
            return (
              <li className="mb-1 options w-min " key={i}>
                <Radio
                  className="m-0 items-center min-w-full flex-row cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent data-[selected=true]:border-primary"
                  value={val}
                  id="radio"
                  name={questions[index].id}
                >
                  <p className="text-2xl ">{val}</p>
                </Radio>
              </li>
            );
          })}
        </RadioGroup>
      </ul>
    );

    const quest_lap = (
      <ul className="text-2xl p-3">
        <li className="font-semibold mb-10">
          Q.{index + 1} {questions[index].question}
        </li>
        <RadioGroup onValueChange={setAns}>
          {questions[index].options.map((val, i) => {
            return (
              <li className="mb-2 options w-min " key={i}>
                <Radio
                  className="m-0 items-center min-w-full flex-row cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent data-[selected=true]:border-primary"
                  value={val}
                  id="radio"
                  name={questions[index].id}
                >
                  <p className="text-2xl ">{val}</p>
                </Radio>
              </li>
            );
          })}
        </RadioGroup>
      </ul>
    );
    return <>{size.width > 1000 ? <>{quest_lap}</> : <>{quests_mobile}</>}</>;
  }
}

export {questions}
