export function redirectToGoogleOAuth() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE;
    console.log("Redirecting to Google OAuth URL:", `${baseUrl}/dashboard/auth/google`);
    window.location.href = `${baseUrl}/dashboard/auth/google`;
}