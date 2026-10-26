import axios from "axios";
import SERVER_ENV from "../constants/env/serverEnv";

const serverAPI = axios.create({
    baseURL: SERVER_ENV.API_URL,
    withCredentials: false
});

serverAPI.interceptors.response.use(
    response => response,
    error => {
        error.errorMessage = error?.response?.data?.message ?? error?.message ?? "Some error occurred";

        return Promise.reject(error);
    }
);

export default serverAPI;