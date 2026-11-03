"use client";

import { usePathname } from "next/navigation";

const Topbar = () => {
    const pathname = usePathname();
    const currentPage = pathname.split("/")?.at(-1);

    return (
        <header className="h-16 flex capitalize items-center px-6 border-b border-border-primary bg-bg-primary">
            <span className="text-xs tracking-widest font-semibold uppercase text-text-muted">
                {currentPage}
            </span>
        </header>
    );
};

export default Topbar;