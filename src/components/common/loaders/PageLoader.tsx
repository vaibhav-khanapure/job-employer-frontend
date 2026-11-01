"use client";

import useLoaderStore from "@/src/store/loaderStore";
import Loaders from "./loaders";
import COLORS from "@/src/constants/colors";

const PageLoader = () => {
    const pageLoader = useLoaderStore(state => state?.pageLoader);

    if (!pageLoader?.show) return null;

    return (
        <div className="fixed top-0 left-0 h-screen w-full grid place-items-center bg-black/10">
            <div className="p-4 shadow-xl flex items-center justify-center gap-4 bg-white">
                <Loaders.Spinner color={COLORS.PRIMARY} />
                {pageLoader?.text && (
                    <span className="text-primary">{pageLoader?.text}</span>
                )}
            </div>
        </div>
    );
};

export default PageLoader;