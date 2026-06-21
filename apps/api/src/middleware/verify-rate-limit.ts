import rateLimit from "express-rate-limit";
import { rateLimitConfig } from "@/config/rate-limit-config";

export const verifyRateLimit = rateLimit(rateLimitConfig);