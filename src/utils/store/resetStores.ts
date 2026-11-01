import useAuthStore from "@/src/store/authStore";
import useCompanyStore from "@/src/store/companyStore";
import useToastStore from "@/src/store/toastStore";
import useUserStore from "@/src/store/userStore";

const resetStores = () => {
    const stores = [
        useAuthStore,
        useCompanyStore,
        useToastStore,
        useUserStore,
    ];

    stores.forEach(store => {
        store.getState().resetState();
    });
};

export default resetStores;