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
    username: string,
    email: string,
    email_verified: boolean,
    phone_verified: boolean,
    sub: string

}

export type Request = {
    id: number,
    user_id: string,
    name: string,
    blood_type: string,
    quantity: number,
    hospital_name: string,
    request_at: Date,
    lat: number,
    long: number
}

export type Position = {
    lat: number,
    lng: number
}

export type RsDetail = {
    id: number,
    name: string,
    address: string,
    lat: number,
    long: number
}

export type NewRequest = {
    nama: string,
    golonganDarah: string,
    alamat: string,
    kuantitas: number,
    rumahSakit: {
        id: string,
        displayName: string,
        koordinat: Position
    }
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

export const NewRequestSchema: ZodType<NewRequest> = z.object({
    nama: z.string({
        required_error: "Nama harus diisi",
    }),
    golonganDarah: z.string({
        required_error: "Golongan Darah harus diisi",
    }),
    alamat: z.string({
        required_error: "Alamat harus diisi sesuai ktp",
    }),

    kuantitas: z.coerce
    .number({
      required_error: "Kuantitas harus diisi",
      invalid_type_error: "Kuantitas harus berupa angka",
    })
    .int()
    .positive()
    .min(1, { message: "Minimal kuantitas 1" }),

    rumahSakit: z.object({
        id: z.string(),
        displayName: z.string(),
        koordinat: z.object({
            lat: z.number(),
            lng: z.number(),
        })
    }),
});