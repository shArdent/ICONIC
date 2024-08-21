import { Value } from "@radix-ui/react-select"
import { z, ZodType } from "zod"

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
    donor_name: string,
    blood_type: string,
    donor_Address: string
}

export const DonorSchema: ZodType<Donor> = z.object({
    donor_name: z.string({
        required_error: "Nama harus diisi",
    }).refine((value) => {
        return value.length > 3 && value.trim() !== ""
    }, { message: "Input anda tidak valid" }),
    blood_type: z.string({
        required_error: "Golongan Darah harus diisi",
    }),
    donor_Address: z.string({
        required_error: "Alamat harus diisi sesuai ktp",
    }).refine((value: string) => {
        return value.trim() !== "" && value.length > 1
    }, { message: "Input anda tidak valid" }),
})