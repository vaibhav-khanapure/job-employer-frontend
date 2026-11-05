"use client";

import APP from "@/src/constants/app";
import { usePathname } from "next/navigation";

const Topbar = () => {
    const pathname = usePathname();
    const currentPage = pathname.split("/")?.at(-1);

    return (
        <header className="sticky top-0 z-1 bg-bg-primary">
            <div className="container h-16 flex items-center border-b border-border-primary">

                <div className="flex items-center h-16 w-64 px-6 border-r border-border-primary">
                    <h2 className="text-[23px] font-bold tracking-tight text-text-primary">
                        {APP.APP_NAME}
                        <span className="text-text-primary">.</span>
                    </h2>
                </div>

                <div className="h-16 flex-1 flex capitalize items-center px-6 bg-bg-primary">
                    <span className="text-xs tracking-widest font-semibold uppercase text-text-muted">
                        {currentPage}
                    </span>
                </div>

            </div>
        </header>
    );
};

export default Topbar;