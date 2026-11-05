"use client";

import { useState } from "react";
import ProfileTop from "./components/ProfileTop";
import Tabs from "./components/Tabs";
import Info from "./components/tabs/Info";
import About from "./components/tabs/About";
import Contact from "./components/tabs/Contact";
import SocialMedias from "./components/tabs/SocialMedias";
import { useQuery } from "@tanstack/react-query";
import API from "@/src/lib/API";
import toast from "@/src/lib/toast";
import pageLoader from "@/src/actions/loaders/pageLoader";
import useQueryResponseHandler from "@/src/hooks/api/useQueryResponseHandler";
import type { CompanyProfile } from "@/src/types/entities/company/companyProfile.types";

const Company = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("Info");

  const { data, error, isSuccess, isError, isFetching } = useQuery<CompanyProfile>({
    queryKey: ["company-profile"],
    queryFn: async () => {
      const { data } = await API.get("/company/profile");
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  useQueryResponseHandler({
    isError,
    isFetching,
    isSuccess,
    onBefore: () => pageLoader.show("Fetching company profile, please wait..."),
    onError: () => error && toast.error(error?.errorMessage),
    onCompleted: () => pageLoader.close()
  });

  return (
    <main>
      {data && <ProfileTop data={data?.profile_top} />}

      <div className="p-6 mt-6 rounded-md bg-bg-primary border border-border-primary">
        <Tabs currentActiveTab={currentActiveTab} handleUpdateActiveTab={(tab: string) => setCurrentActiveTab(tab)} />

        <div className="p-4 mt-6 rounded-xl border border-border-primary">
          {currentActiveTab === "Info" && <Info />}
          {currentActiveTab === "About" && <About />}
          {currentActiveTab === "Contact & Address" && <Contact />}
          {currentActiveTab === "Social Medias" && <SocialMedias />}
        </div>
      </div>
    </main>
  );
};

export default Company;