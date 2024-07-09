"use client";
import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";
import { runGEMINIAI } from "../../../../utils/geminiAI.mjs";
export default function CreateWithAi() {
  const [data, setData] = useState([]);

  const [query, setQuery] = useState("");
  const fetchData = async () => {
    try {
      const data = runGEMINIAI(query);
      setData(data);
    } catch (err) {}
  };
  

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col mx-3">
        <div className="ai_form_container  p-5 flex flex-col w-full max-w-96 rounded-md prompt">
          <input
            type="text"
            className="input p-4 mb-5 rounded-md"
            placeholder="e.g Prepare 10 math question for class 5th"
            value={query}
            onInput={(e) => setQuery(e.target.value)}
          ></input>
          {query.length >= 8 ? (
            <Button variant="solid" color="primary" onClick={() => fetchData()}>
              Create
            </Button>
          ) : (
            <Button variant="solid" color="default">
              Create
            </Button>
          )}
        </div>
        <div className="ai_response">{data}</div>
      </div>
    </>
  );
}
