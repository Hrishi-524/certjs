export function redirectToGoogleOAuth() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE;
    window.location.href = `${baseUrl}/dashboard/auth/google`;
}