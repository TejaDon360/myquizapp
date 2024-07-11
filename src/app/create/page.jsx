"use client";

import { Button } from "@nextui-org/button";
import Providers from "../../../components/themeProvider";
import Link from "next/link";

export default function CreateQuiz() {
  return (
    <Providers>
      <div className="createQuiz p-3">
        <h2 className="text-2xl font-bold mb-5">Create your own Quiz</h2>
        <div className="p-3">
          <p className="text-sm font-mono mb-1">Choose from following options:</p>
          <div className="quiz_create_options flex flex-row gap-2 mt-5 ">
            <Button variant="solid" color="secondary" className="rounded-md">
              Create Manually
            </Button>
            <Button variant="solid" color="primary" className="rounded-md">
              <Link href={"../create/createwithai"}>Create with AI</Link>
            </Button>
          </div>
        </div>
      </div>
    </Providers>
  );
}
