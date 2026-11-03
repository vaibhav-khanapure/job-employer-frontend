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
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150
             ${active ?
                    "bg-sidebar-link-bg-active text-sidebar-link-text-active" :
                    "text-sidebar-link-text hover:bg-sidebar-link-bg-hover hover:text-sidebar-link-text-hover"}`
            }
        >
            {children}

            <span className={`text-sm ${active ? "font-semibold" : "font-medium"}`}>
                {name}
            </span>
        </Link>
    );
};

export default NavLink;