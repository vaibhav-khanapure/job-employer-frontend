import MainSidebar from "@/src/components/common/sidebars/mainSidebar/MainSidebar";
import type { ReactNode } from "react";
import Topbar from "./components/Topbar";

interface Props {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <main className="flex">
            <MainSidebar />
            <div className="flex-1 bg-bg-secondary">
                <Topbar />
                <div className="p-6">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Layout;