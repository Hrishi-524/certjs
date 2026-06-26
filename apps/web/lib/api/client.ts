import axios from "axios"

export default async function clientApi() {
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE,
        withCredentials: true,
        timeout: 10000,
    });

    return api
}

