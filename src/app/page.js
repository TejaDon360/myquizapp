"use client";
import Image from "next/image";
import UserPrompt from "./userPrompt/page";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useContext } from "react";
import CreateQuiz from "./create/page";
import ThemeSwitcher from "../../components/themeSwitcher";
import Providers from "../../components/themeProvider";
import { useWindowSize } from "../../components/windowSize";
import { AppContext } from "../context/AppContext";
export default function Home() {
  const { username, setName, category, setCat } = useContext(AppContext);
  let size = useWindowSize();
  return (
    <Providers>
      {size.width < 750 ? 
      <div className="grid grid-cols-1 gap-4 h-screen grid-rows-10 p-3">
        <div className="nav_top rounded-md row-span-1 row-start-1 ">
          <div className="grid grid-cols-2 items-center h-full mx-2">
            <div className="justify-self-start text-3xl font-bold">Qzap</div>
            <div className="flex flex-row justify-self-end">
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        <div className="nav_top p-6 rounded-md row-span-4 flex flex-col ">
          <p className="w-fit rounded-lg p-1 mb-1">Play</p>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="p-3 main_quiz_examples rounded-md ">
              <h3 className="font-semibold">Math quiz</h3>
              <p>Time : 25sec</p>
              <p>Category : Math</p>
            </div>
            <div className="p-3 main_quiz_examples rounded-md ">
              <h3 className="font-semibold">GK quiz</h3>
              <p>Time : 25sec</p>
              <p>Category : general knowledge</p>
            </div>
          </div>
          <p className="opacity-65 text-right mt-5">
            <Link href={"/userPrompt"}>Play other quizes....</Link>{" "}
          </p>
        </div>
        <div className="nav_top p-6 rounded-md row-span-4 ">
          <p className="mb-1 p-1">Create</p>
          <CreateQuiz></CreateQuiz>
        </div>
      </div>:<></>
      }
    </Providers>
  );
}
