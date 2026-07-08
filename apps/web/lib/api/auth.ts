import clientApi from "@/lib/api/client";
import authClient from "./auth-client";
import { LoginInput, LoginResponse, MeResponse, RefreshResponse, SignUpInput, SignUpResponse } from "@/types/auth.types";

export async function signup(input: SignUpInput): Promise<SignUpResponse> {
    const { data } = await authClient.post<SignUpResponse>("/dashboard/auth/signup", input);
    return data;
}

export async function login(input: LoginInput): Promise<LoginResponse> {
    const { data } = await authClient.post<LoginResponse>("/dashboard/auth/login", input);
    return data;
}

export async function logout(): Promise<void> {
    await clientApi.post("/dashboard/auth/logout");
}

export async function refresh(): Promise<RefreshResponse> {
    const { data } = await authClient.post<RefreshResponse>("/dashboard/auth/refresh")
    return data
}

export async function me(): Promise<MeResponse> {
    const { data } = await clientApi.get<MeResponse>("/dashboard/auth/me")
    return data
}