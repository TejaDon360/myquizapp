"use client";

import { useContext } from "react";
import { createContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  let [username, setName] = useState("");
  let [category , setCat] = useState("math")

  return <AppContext.Provider value={{ username, setName , category , setCat }}>{children}</AppContext.Provider>;
}

export { AppContext };
