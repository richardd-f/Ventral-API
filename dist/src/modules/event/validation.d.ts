import z from "zod";
export declare const createEventSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    date_start: z.ZodString;
    date_end: z.ZodString;
    price: z.ZodNumber;
    quota: z.ZodOptional<z.ZodNumber>;
    status: z.ZodEnum<{
        OPEN: "OPEN";
        CLOSED: "CLOSED";
        SUSPENDED: "SUSPENDED";
    }>;
}, z.core.$strip>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export declare const updateEventSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    date_start: z.ZodOptional<z.ZodString>;
    date_end: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    quota: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    status: z.ZodOptional<z.ZodEnum<{
        OPEN: "OPEN";
        CLOSED: "CLOSED";
        SUSPENDED: "SUSPENDED";
    }>>;
}, z.core.$strip>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
//# sourceMappingURL=validation.d.ts.map