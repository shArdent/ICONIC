import { FormDataLogin, FormDataRegister, LoginResponse } from "@/types/authTypes"
import axios from "@/lib/axios"
import { deleteCookie } from "cookies-next"

export async function registerAccount(data: FormDataRegister) {
    const response = await axios.post("auth/register", {})
    return response
}

export const Logout = async () => {
    deleteCookie("token", { path: "/" });
    deleteCookie("refreshToken", { path: "/" });
    deleteCookie("user", { path: "/" });

    window.location.href = "/login"
};