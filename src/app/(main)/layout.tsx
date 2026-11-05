import MainSidebar from "@/src/components/common/sidebars/mainSidebar/MainSidebar";
import type { ReactNode } from "react";
import Topbar from "./components/Topbar";

interface Props {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <main className="">
            <Topbar />

            <div className="flex-1 container bg-bg-secondary">
                <MainSidebar />
                {/* <Topbar /> */}
                {/* <div className="p-6">
                    {children}
                </div> */}
            </div>
        </main>
    );
};

export default Layout;