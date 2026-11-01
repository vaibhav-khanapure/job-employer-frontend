import MainSidebar from "@/src/components/common/sidebars/mainSidebar/MainSidebar";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <main className="flex">
            <MainSidebar />
            <div className="flex-1 bg-[#FAF8F2]">
                {children}
            </div>
        </main>
    );
};

export default Layout;