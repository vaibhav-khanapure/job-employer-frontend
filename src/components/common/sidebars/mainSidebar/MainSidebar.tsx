"use client";

import { usePathname } from "next/navigation";
import NavLink from "./components/NavLink";
import APP from "@/src/constants/app";
import navLinks from "./data/links";

const MainSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="flex flex-col w-full p-4 gap-2 max-w-70 min-h-screen border border-r-[rgba(6,6,6,.08)]">
            <div className="mb-6 flex items-center gap-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    {APP.APP_NAME}
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                    EMPOWER HIRING
                </p>
            </div>

            {navLinks.map((Link, index) => (
                <NavLink name={Link?.name} key={`link-${index}-${Link.name}`} path={Link?.path} active={pathname === Link?.path}>
                    <Link.icon color={pathname === Link?.path ? "#fff" : "#111"} size={20} />
                </NavLink>
            ))}
        </aside>

    );
};

export default MainSidebar;