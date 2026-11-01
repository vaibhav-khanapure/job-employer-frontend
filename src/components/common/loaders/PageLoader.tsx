"use client";

import useLoaderStore from "@/src/store/loaderStore";
import Loaders from "./loaders";
import COLORS from "@/src/constants/colors";

const PageLoader = () => {
    const pageLoader = useLoaderStore(state => state.pageLoader);

    if (!pageLoader?.show) return null;

    return (
        <div className="fixed p-4 inset-0 z-9999 grid place-items-center bg-black/20 backdrop-blur-[3px] animate-in fade-in duration-200">
            <div className="flex min-w-45 max-w-[90%] items-center justify-center gap-4 rounded-xl border border-gray-100 bg-white px-7 py-5 shadow-2xl shadow-black/10 animate-in zoom-in-95 duration-200">

                <Loaders.Spinner
                    borderSize={3}
                    color={COLORS.PRIMARY}
                    size={30}
                />

                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold tracking-wide text-gray-800">
                        {pageLoader.text || "Please wait"}
                    </span>

                    <span className="text-xs text-gray-400">
                        Processing your request...
                    </span>
                </div>

            </div>
        </div>
    );
};

export default PageLoader;