export type VerifiedResponse = {
    verified: true;
    templateName: string;
    recipient: Record<string, string | number>;
    issuedAt: string;
    status: "completed";
}

export type NotVerifiedResponse = {
    verified: false;
    message: string;
}

export type VerificationResponse = VerifiedResponse | NotVerifiedResponse