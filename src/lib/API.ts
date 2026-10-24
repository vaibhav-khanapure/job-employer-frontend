import axios from "axios";
import useAuthStore from "../store/authStore";
import ENV from "../constants/env/env";

const API = axios.create({
    baseURL: ENV.client.API_URL,
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
        error.errorMessage = error?.response?.data?.message ?? error?.message ?? "Some error occurred";

        return Promise.reject(error);
    }
);

export default API;