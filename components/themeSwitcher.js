"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "@nextui-org/button";
import { MoonIcon } from "../public/moonIcon";
import { SunIcon } from "../public/sunIcon";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme('dark');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div>
      <Button
         isIconOnly 
         className={"rounded-full w-12 h-12 themeBtn" }
         
        onClick={handleTheme}
        startContent={
          theme == "dark" ? <SunIcon></SunIcon> : <MoonIcon></MoonIcon>
        }
      ></Button>
    </div>
  );
};

export default ThemeSwitcher;
