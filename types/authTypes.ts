import { z, ZodType } from "zod"

export type FormDataRegister = {
    username : string,
    email : string,
    password : string,
    confirmPassword : string
}

export type FormDataLogin = {
    email : string,
    password : string
}

export type LoginResponse = {
    data?: {
      token: string;
    };
    error?: string;
  };

export const registrationShema : ZodType<FormDataRegister> = z.object({
    username : z.string().min(3, { message : "Username harus lebih dari 3 karakter"}),
    email : z.string().email({message : "Email tidak valid"}),
    password : z.string().min(6, {message : "Password harus 6 karakter atau lebih"}),
    confirmPassword : z.string().min(6, {message : "Password harus 6 karakter atau lebih"}),
}).refine((data) => data.password === data.confirmPassword, {
    message : "Password tidak sama",
    path : ["confirmPassword"]
}) 

