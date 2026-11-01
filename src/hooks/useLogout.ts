import { useMutation } from "@tanstack/react-query";
import BROWSER_STORAGE from "../constants/browserStorage";
import resetStores from "../utils/store/resetStores";
import authAPIAction from "../actions/auth/authAPIAction";
import { useRouter } from "next/navigation";

const useLogout = () => {
    const { replace } = useRouter();

    const { isPending, mutate } = useMutation({
        mutationFn: () => authAPIAction("/logout", { method: "DELETE" }),
        onSettled: () => replace("/")
    });

    const handleLogout = async () => {
        localStorage.removeItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN);

        resetStores();

        mutate();
    };

    return handleLogout();
};

export default useLogout;