import { z, ZodType } from "zod"

export type Request = {
    id: number,
    user_id: string,
    name: string,
    blood_type: string,
    quantity: number,
    status : string,
    hospital_name: string,
    request_at: string,
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

export type Donor = {
    donorName: string,
    bloodType: string,
    donorAddress: string
}

export const DonorSchema: ZodType<Donor> = z.object({
    donorName: z.string({
        required_error: "Nama harus diisi",
    }).refine((value) => {
        return value.length > 3 && value.trim() !== ""
    }, { message: "Input anda tidak valid" }),
    bloodType: z.string({
        required_error: "Golongan Darah harus diisi",
    }),
    donorAddress: z.string({
        required_error: "Alamat harus diisi sesuai ktp",
    }).refine((value: string) => {
        return value.trim() !== "" && value.length > 1
    }, { message: "Input anda tidak valid" }),
})