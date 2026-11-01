"use client";

import { usePathname } from "next/navigation";

const Topbar = () => {
    const pathname = usePathname();
    const currentPage = pathname.split("/")?.at(-1);

    return (
        <header className="h-16 flex capitalize items-center px-4 border-b border-gray-200 bg-white">
            <span className="text-sm font-medium">{currentPage}</span>
        </header>
    );
};

export default Topbar;