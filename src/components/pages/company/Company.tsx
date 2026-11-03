"use client";

import { useState } from "react";
import ProfileTop from "./components/ProfileTop";
import Tabs from "./components/Tabs";
import Info from "./components/tabs/Info";

const Company = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("Info");

  return (
    <main>
      <ProfileTop />

      <div className="p-6 mt-6 rounded-md bg-bg-primary border border-border-primary">
        <Tabs currentActiveTab={currentActiveTab} handleUpdateActiveTab={(tab: string) => setCurrentActiveTab(tab)} />

        <div className="p-4 mt-6 rounded-xl border border-border-primary">
          {currentActiveTab === "Info" && <Info />}
        </div>
      </div>
    </main>
  );
};

export default Company;