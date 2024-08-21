"use client"

import axios from "@/lib/axios";
import { getCookie, setCookie } from "cookies-next";

export const useRefreshTOken = () => {
    const refreshToken = getCookie("refreshToken");

    const refreshing = async () => {
        const res = await axios.post("auth/refresh", {
            refresh: refreshToken
        })

        if (refreshToken) setCookie("Token", res.data.Token, { expires: new Date(new Date().setDate(new Date().getDate() + 1)) });
    }
}