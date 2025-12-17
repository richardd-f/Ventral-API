import z from "zod";


// Login schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
});
export type LoginInput = z.infer<typeof loginSchema>;


// Register schema
export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),

    phone: z
        .string()
        .min(7, "Phone number must be at least 10 digits long") 
        .max(14, "Phone number must be at most 14 digits long"),

    bio: z
        .string()
        .min(1, "Bio is required")
        .max(300, "Bio must be at most 300 characters long"),
    
    img_url: z
        .string()
        .min(1, "Image url is required")
        .url("Invalid image url"),

    date_of_birth: z
        .string()
        .min(10, "Date of birth is required")
        .date("Date of birth must be in YYYY-MM-DD format")

});
export type RegisterInput = z.infer<typeof registerSchema>;