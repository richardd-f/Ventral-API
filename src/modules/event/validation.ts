import z from "zod";

export const createEventSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required"),
    
    description: z
        .string()
        .min(1, "Description is required"),
    
    date_start: z
        .string()
        .datetime("Date start must be a valid datetime ISO string"),
    
    date_end: z
        .string()
        .datetime("Date end must be a valid datetime ISO string"),
        
    price: z
        .number()
        .nonnegative("Price must be non-negative"),
        
    quota: z
        .number()
        .nonnegative("Quota must be non-negative")
        .optional(),
        
    status: z
        .enum(["OPEN", "CLOSED", "SUSPENDED"])
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

export const updateEventSchema = createEventSchema.partial();

export type UpdateEventInput = z.infer<typeof updateEventSchema>;
