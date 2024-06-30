import React, { useState } from "react";
import Providers from "./themeProvider";

import { Tabs, Tab } from "@nextui-org/tabs";

export default function TabsGroup({ children }) {
  const [selected, setSelected] = useState("photos");

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={setSelected}>
        <Tab key="photos" title="Photos"></Tab>
        <Tab key="music" title="Music"></Tab>
        <Tab key="videos" title="Videos"></Tab>
      </Tabs>
    </div>
  );
}
