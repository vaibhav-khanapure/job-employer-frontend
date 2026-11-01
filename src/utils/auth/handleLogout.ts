import pageLoader from "@/src/actions/loaders/pageLoader";
import BROWSER_STORAGE from "@/src/constants/browserStorage";
import resetStores from "../store/resetStores";
import authAPIAction from "@/src/actions/auth/authAPIAction";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Options {
    replace?: (href: string, options?: NavigateOptions | undefined) => void;
    revokeSession?: boolean;
};

const handleLogout = async (options?: Options) => {
    try {
        pageLoader.show("Logging out");

        localStorage.removeItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN);

        resetStores();

        if (options && options?.revokeSession) await authAPIAction("/logout", { method: "DELETE" });
    } catch (error) {

    } finally {
        if (options?.replace) options.replace("/");
        else window.location.replace("/");

        pageLoader.close();
    };
};

export default handleLogout;