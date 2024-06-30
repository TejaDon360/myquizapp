"use client";

import { useContext } from "react";
import { createContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  let [username, setName] = useState("");
  let [category , setCat] = useState("math")
  let [score , setScore] = useState(0)

  return <AppContext.Provider value={{ username, setName , category , setCat , score , setScore }}>{children}</AppContext.Provider>;
}

export { AppContext };
