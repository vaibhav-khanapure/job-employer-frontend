import APP from "@/src/constants/app";
import links from "./links";
import Link from "next/link";
import socialMedias from "./socialMedias";
import type { CSSProperties } from "react";

const MainFooter = () => {
    return (
        <footer className="bg-bg-primary border-t border-border-primary">
            <div className="container px-6 lg:px-12">

                {/* Main footer */}
                <div className="pt-16 lg:pt-20 pb-8 flex flex-col lg:flex-row gap-14 lg:gap-24">

                    {/* Brand */}
                    <div className="w-full lg:max-w-64 shrink-0">
                        <Link href="/" className="inline-block">
                            <h2 className="text-text-primary font-bold text-3xl tracking-tight">
                                {APP.APP_NAME}
                            </h2>
                        </Link>

                        <p className="mt-4 text-sm leading-6 text-text-tertiary md:max-w-60">
                            Bringing great companies and talented people together.
                            Make your next great hire with confidence.
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-12">
                        {links?.map((link) => (
                            <div key={`main-footer-link-${link?.title}`}>
                                <h6 className="font-semibold mb-6 uppercase text-[11px] tracking-[0.14em] text-text-primary">
                                    {link?.title}
                                </h6>

                                <div className="flex flex-col items-start gap-4 text-[13px] text-text-tertiary">
                                    {link?.links?.map((navlink) => (
                                        <Link
                                            href={navlink?.link}
                                            key={`main-footer-link-${link?.title}-${navlink?.name}`}
                                            className="transition-colors duration-200 hover:text-text-primary hover:underline"
                                        >
                                            {navlink?.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4 pb-2 mt-4">
                    <h2 className="text-text-muted">
                        follow us on social media:
                    </h2>

                    <div className="flex items-center">
                        {socialMedias.map((social, index) => (
                            <Link
                                href={social?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={social?.name}
                                key={`main-footer-social-media-${index}`}
                                className="size-10 grid place-items-center rounded-full transition duration-300 hover:-translate-y-1 hover:bg-(--social-color) hover:text-white"
                                style={{ "--social-color": social?.color } as CSSProperties}
                            >
                                <social.icon size={22} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom footer */}
                <div className="border-t border-border-primary py-7 flex flex-col-reverse sm:flex-row items-center justify-between gap-5">

                    <p className="text-xs text-text-muted">
                        © {2026} {APP.APP_NAME}. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-text-tertiary">
                        {links?.[3]?.links?.map((link) => (
                            <Link
                                href={link?.link}
                                key={`footer-extra-link-${link?.name}`}
                                className="transition-colors duration-200 hover:text-text-primary hover:underline"
                            >
                                {link?.name}
                            </Link>
                        ))}
                    </div>

                    <p className="text-xs text-text-muted">
                        Built for better hiring.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;