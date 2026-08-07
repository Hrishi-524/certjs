import rateLimit from "express-rate-limit";
import { rateLimitConfig } from "#app/config/rate-limit-config";

export const verifyRateLimit = rateLimit(rateLimitConfig);