import { getAccessToken } from "../auth/token-storage";
import { AxiosError, AxiosInstance } from "axios";
import { ApiError } from "./errors";

export function setupInterceptors(clientApi: AxiosInstance) {
    clientApi.interceptors.request.use((config) => {
        const token = getAccessToken()

        if(token) config.headers.Authorization = `Bearer ${token}`

        return config
    })

    clientApi.interceptors.response.use(
        response => response,
        (error: AxiosError) => {
            if(error.response) {
                throw new ApiError(
                    error.response.status,
                    (error.response.data as any)?.message ??
                    "Request failed",
                    error.response.data
                );
            }
            throw new ApiError(
                500,
                "Network error"
            );
        }
    )
}