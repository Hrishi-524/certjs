import { VerificationResponse } from "@/types/public.types";
import clientApi from "@/lib/api/client";


export async function verifyCertificate(verifyToken: string): Promise<VerificationResponse> {
    const { data } = await clientApi.get<VerificationResponse>(`/public/certificates/${verifyToken}`)
    return data
}