import axios from "axios";

const authClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE,
    withCredentials: true,
});

export default authClient;