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
import { Dice4Icon, EllipsisIcon, HomeIcon, HouseIcon, Plus, User2Icon } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";
import ButtonWithToolTip from "../../components/buttonWithToolTip";
export default function Home() {
  const { username, setName, category, setCat } = useContext(AppContext);
  let size = useWindowSize();
  return (
    <Providers>
      {size.width < 750 ? (
        <div className="grid grid-cols-1 gap-4 h-screen grid-rows-10 p-3">
          <div className="nav_top rounded-md row-span-1 row-start-1 ">
            <div className="grid grid-cols-2 items-center h-full mx-5">
              <div className="justify-self-start text-3xl font-bold">Qzap</div>
              <div className="flex flex-row justify-self-end gap-3">
                <ThemeSwitcher />
                <Button
                  variant="solid"
                  color="default"
                  className={"rounded-full w-12 h-12 themeBtn"}
                  isIconOnly
                  startContent={"r"}
                ></Button>
              </div>
            </div>
          </div>

          <div className="nav_top p-6 rounded-md row-span-8 grid grid-cols-2 grid-rows-4">
            <p className="w-fit rounded-lg p-1 mb-1 col-span-2 row-span-1 h-5 row-start-1">Play</p>
            <div className="grid grid-cols-2 gap-3  col-span-2 row-span-2 row-start-2 ">
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
            <p className="opacity-65 text-right mt-5 row-start-4 row-span-1 col-span-2"></p>
          </div>
          {/* <div className="nav_top p-6 rounded-md row-span-4 ">
            <p className="mb-1 p-1">Create</p>
            <CreateQuiz></CreateQuiz>
          </div> */}
          <div className="footer rounded-md row-span-2 nav_bottom flex flex-row justify-center gap-3 items-center">
            <Button
              href={"/"}
              as={Link}
              startContent={<HomeIcon></HomeIcon>}
              className="text-lg font-semibold flex flex-col h-fit"
              variant="light"
            >
              Home
            </Button>
            <Button
              href={"/"}
              as={Link}
              startContent={<Dice4Icon></Dice4Icon>}
              className="text-lg font-semibold  flex flex-col h-fit"
              variant="light"
            >
              Play
            </Button>
            <Button
              href={"/"}
              as={Link}
              startContent={<Plus></Plus>}
              className="text-lg font-semibold  flex flex-col  h-fit"
              variant="light"
            >
              Create
            </Button>
            <Button
              href={"/"}
              as={Link}
              startContent={<User2Icon></User2Icon>}
              className="text-lg font-semibold flex flex-col h-fit"
              variant="light"
            >
              Profile
            </Button>
            {/* <Button
              href={"/"}
              as={Link}
              startContent={<EllipsisIcon></EllipsisIcon>}
              className="text-lg font-semibold  flex flex-col  h-fit"
              variant="light"
            >
              More
            </Button> */}
          </div>
        </div>
      ) : (
        <div className="p-5">
          <div className="grid grid-cols-7 h-screen grid-rows-7 p-3 overflow-clip gap-x-3 gap-y-5">
            <div className="nav_top rounded-md row-span-1 row-start-1 col-span-7 h-fit ">
              <div className="grid grid-cols-2 h-full mx-5 p-3">
                <div className="justify-self-start text-4xl font-bold">Qzap</div>
                <div className="flex flex-row justify-self-end gap-3">
                  <ThemeSwitcher />
                  <Button
                    variant="solid"
                    color="default"
                    className={"rounded-full w-12 h-12 themeBtn"}
                    isIconOnly
                    startContent={"r"}
                  ></Button>
                </div>
              </div>
            </div>
            <div className="nav_side flex flex-col bg-slate-50  py-5 rounded-md col-span-1 col-start-1 row-start-2 h-fit gap-10 max-w-56 ">
              <ButtonWithToolTip
                icon={<HouseIcon width="2em" height="2em"></HouseIcon>}
                text={"Home"}
                tooltiptext="Home"
              />
              <ButtonWithToolTip
                icon={<Dice4Icon width="2em" height="2em"></Dice4Icon>}
                text={"Play"}
                tooltiptext="Play"
              />
              <ButtonWithToolTip icon={<Plus width="2em" height="2em"></Plus>} text={"Create"} tooltiptext="Create" />
              <ButtonWithToolTip
                icon={<User2Icon width="2em" height="2em"></User2Icon>}
                text={"Profile"}
                tooltiptext="Profile"
              />
              <ButtonWithToolTip
                icon={<EllipsisIcon width="2em" height="2em"></EllipsisIcon>}
                text={"More"}
                tooltiptext="More"
              />
            </div>

            <div className="explore_quiz col-span-6 col-start-2 row-span-5  p-8 rounded-md min-w-fit grid grid-cols-2 md:grid-cols-3 sm:grid-cols-1 sm:grid-rows-4 md:grid-rows-2 gap-10">
              <div className="p-5 rounded-md "></div>
              <div className="p-5 rounded-md "></div>
              <div className="p-5 rounded-md "></div>
              <div className="p-5 rounded-md "></div>
            </div>
          </div>
        </div>
      )}
    </Providers>
  );
}
