import type { Request, Response } from "express";
import { users }from "@certjs/db/schema/users";
import { db } from "@certjs/db/index";
import bcrypt from "bcrypt";

export const insertTempUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        await db.insert(users).values({
            username,
            email,
            password_hash,
            created_at: new Date()
        });
        res.status(201).json({ message: "Temporary user created" });
    } catch (err: any) {
        console.error("DB ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
}