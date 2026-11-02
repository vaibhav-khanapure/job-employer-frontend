"use client";

import { useState } from "react";
import ProfileTop from "./components/ProfileTop";
import Tabs from "./components/Tabs";

const Company = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("Info");

  return (
    <main>
      <ProfileTop />

      <div className="p-6 mt-6 rounded-md bg-white border border-zinc-200">
        <Tabs currentActiveTab={currentActiveTab} handleUpdateActiveTab={(tab: string) => setCurrentActiveTab(tab)} />
      </div>
    </main>
  );
};

export default Company;