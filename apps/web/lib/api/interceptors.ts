import { AxiosError, AxiosInstance } from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "../auth/token-storage";
import { refresh } from "./auth";
import { ApiError } from "./errors";
import { ErrorCode } from "@/types/auth.types";
import { RetryRequest } from "@/types/interceptor.types";

export function setupInterceptors(clientApi: AxiosInstance) {
    clientApi.interceptors.request.use((config) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    clientApi.interceptors.response.use(
        (response) => response,

        async (error: AxiosError) => {
            if (!error.response) {
                throw new ApiError(500, "Network error");
            }

            const originalRequest = error.config as RetryRequest;
          
            const code = (error.response.data as any)?.code;

            if (
                code === ErrorCode.ACCESS_TOKEN_EXPIRED &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                try {
                    const { accessToken } = await refresh();

                    setAccessToken(accessToken);

                    originalRequest.headers.Authorization =
                        `Bearer ${accessToken}`;

                    return clientApi(originalRequest);

                } catch {
                    clearAccessToken();

                    throw new ApiError(
                        401,
                        "Session expired"
                    );
                }
            }

            throw new ApiError(
                error.response.status,
                (error.response.data as any)?.message ??"Request failed",
                error.response.data
            );
        }
    );
}