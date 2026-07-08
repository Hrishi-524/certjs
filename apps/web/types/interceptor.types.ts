import { InternalAxiosRequestConfig } from "axios";

export type ApiFetchOptions = RequestInit & {
    accessToken?: string;
    apiKey?: string;
};

export interface RetryRequest extends InternalAxiosRequestConfig {
    _retry?: boolean;
}
