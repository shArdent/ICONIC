import { FormDataLogin, FormDataRegister, LoginResponse } from "@/types/authTypes"

export async function registerAccount(data: FormDataRegister) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    return result
}

export async function loginAccount(data: FormDataLogin): Promise<any | LoginResponse> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    return result;
}

export const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const getCookie = (name: string) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, null as string | null);
}

export const Logout = async (name: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "auth/logout", {
        method: "POST",
        headers: {
            "authorization": "Bearer " + getCookie("token"),
            "Content-Type": "application/json"
        },
    })

    setCookie(name, '', -1);
};