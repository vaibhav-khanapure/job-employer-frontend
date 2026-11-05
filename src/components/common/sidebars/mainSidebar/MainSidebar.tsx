"use client";

import { usePathname } from "next/navigation";
import NavLink from "./components/NavLink";
import navLinks from "./data/links";

const MainSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="flex flex-col w-64 h-[calc(100vh-64px)] sticky top-0 bg-bg-primary border-r border-border-primary">

            {/* Navigation */}
            <nav className="flex flex-col gap-7 px-3 pt-5 h-[calc(100vh-64px)] overflow-y-auto">
                {navLinks.map((section, sectionIndex) => (
                    <div key={`section-link-${sectionIndex}`} className="flex flex-col gap-1">
                        {section.title && (
                            <p className="px-3 mb-2 text-xs tracking-wider font-medium text-text-muted">
                                {section.title}
                            </p>
                        )}

                        {section.links.map((link) => {
                            const isActive = pathname === link?.path ||
                                (link?.path !== "/home" && pathname.startsWith(`${link?.path}/`))

                            const Icon = link?.icon;

                            return (
                                <NavLink
                                    key={`navlink-${link.path}`}
                                    name={link.name}
                                    path={link.path}
                                    active={isActive}
                                    external={"external" in link && link?.external}
                                >
                                    <Icon
                                        size={20}
                                        strokeWidth={isActive ? 2.2 : 1.8}
                                    />
                                </NavLink>
                            );
                        })}
                    </div>
                ))}
            </nav>

        </aside>
    );
};

export default MainSidebar;