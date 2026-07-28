import { z } from "zod";

const envSchema = z.object({
    // Basic Configuration
    VITE_API_ENDPOINT: z.string().default("http://localhost:3001"),
    VITE_API_TIMEOUT: z.string().default("30000").transform(Number).pipe(z.number().positive()),
});

export type EnvConfig = z.infer<typeof envSchema>;

export const env = envSchema.parse(import.meta.env);