import { Request, Response } from "express";

export async function createApiKey(req: Request, res: Response) {
    // logic to create api key
    res.status(201).json({ message: "API key created" });
}

export async function getApiKey(req: Request, res: Response) {
    // logic to get api key
    res.status(200).json({ message: "API key retrieved" });
}

export async function deleteApiKey(req: Request, res: Response) {
    // logic to delete api key
    res.status(200).json({ message: "API key deleted" });
}

export async function deActivateApiKey(req: Request, res: Response) {
    // logic to deactivate api key
    res.status(200).json({ message: "API key deactivated" });
}