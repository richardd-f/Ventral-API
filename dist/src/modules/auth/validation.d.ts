import z from "zod";
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginInput = z.infer<typeof loginSchema>;
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodString;
    bio: z.ZodString;
    img_url: z.ZodString;
    date_of_birth: z.ZodString;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
//# sourceMappingURL=validation.d.ts.map