export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

export function setAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
}

export function clearAccessToken() {
    localStorage.removeItem("accessToken");
}

export function hasAccessToken() {
    return getAccessToken() !== null;
}