import { AxiosError } from "axios";

export interface APIError extends AxiosError {
    errorMessage: string;
};