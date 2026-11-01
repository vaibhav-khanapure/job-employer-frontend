import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    name: string;
    path: string;
    active?: boolean;
}

const NavLink = ({ children, path, name, active }: Props) => {
    return (
        <Link
            href={path}
            className={`flex items-center gap-3 p-4 rounded-xl ${active ? 'bg-black' : 'hover:bg-slate-50'}`}
            title={name}
        >
            {children}
            <span className={`text-sm tracking-wide text-primary ${active ? 'text-white' : ''}`}>
                {name}
            </span>
        </Link>
    );
};

export default NavLink;