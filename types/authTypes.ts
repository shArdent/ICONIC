import { z, ZodType } from "zod"

export type FormDataRegister = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export type FormDataLogin = {
    email: string,
    password: string
}

export type LoginResponse = {
    data?: {
        token: string;
    };
    error?: string;
};

export type User = {
    id: string,
    address?: string | undefined,
    username: string,
    email: string,
    birthdate?: string,
    blood_type?: string,
    phone?: string,
    gender?: string,
    first_name?: string,
    last_name?: string,
}


export const registrationShema: ZodType<FormDataRegister> = z.object({
    username: z.string().min(3, { message: "Username harus lebih dari 3 karakter" }),
    email: z.string().email({ message: "Email tidak valid" }),
    password: z.string().min(6, { message: "Password harus 6 karakter atau lebih" }),
    confirmPassword: z.string().min(6, { message: "Password harus 6 karakter atau lebih" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"]
})

export const profileDataSchema: ZodType<User> = z.object({
    id: z.string(),
    username: z.string().min(3, { message: "Username harus lebih dari 3 karakter" }),
    email: z.string().email({ message: "Email tidak valid" }),
    birthdate: z.string().optional(),
    blood_type: z.string().optional(),
    phone: z.string().optional(),
    gender: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    address: z.string().optional(),

})