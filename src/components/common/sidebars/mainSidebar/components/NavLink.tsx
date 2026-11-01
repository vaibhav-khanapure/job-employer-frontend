import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    name: string;
    path: string;
    active?: boolean;
    external?: boolean;
};

const NavLink = ({ children, path, name, active, external }: Props) => {
    return (
        <Link
            href={path}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            title={name}
            aria-current={active ? "page" : undefined}
            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150
                ${active ? "bg-gray-100 text-primary" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"}
            `}
        >
            {children}

            <span className={`text-sm ${active ? "font-semibold" : "font-medium"}`}>
                {name}
            </span>
        </Link>
    );
};

export default NavLink;