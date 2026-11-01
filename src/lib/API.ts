import axios from "axios";
import useAuthStore from "../store/authStore";
import CLIENT_ENV from "../constants/env/clientEnv";
import handleLogout from "../utils/auth/handleLogout";
import toast from "./toast";

const API = axios.create({
    baseURL: CLIENT_ENV.API_URL,
    withCredentials: false
});

API.interceptors.request.use(request => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
    };

    return request;
});

API.interceptors.response.use(
    response => response,
    error => {
        let message = error?.response?.data?.message ?? error?.message ?? "Some error occurred";

        if (message === "__401") {
            handleLogout({ revokeSession: true });
            message = "Session expired, please sign in again";
        };

        error.errorMessage = message;

        return Promise.reject(error);
    }
);

export default API;