import axios from "axios"
import { setupInterceptors } from "./interceptors";

const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE,
    withCredentials: true,
    timeout: 10000,
});

setupInterceptors(clientApi);

export default clientApi