import axios from "axios"
import { headers } from "next/headers"

export async function serverApi() {
    const h = await headers()
    const cookie = h.get("cookie") || ""

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE,
        headers: {
            cookie
        },
        withCredentials: true,
        timeout: 10000,
    });

    return api
}