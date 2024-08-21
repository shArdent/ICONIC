"use client";

import { axiosAuth } from "@/lib/axios";
import { getCookie } from "cookies-next"
import { useEffect } from "react";
const useAxiosAuth = () => {
    const token = getCookie("token");

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use((config): any => {
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }

            return config;
        })

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
        }
    }, [token]);

    return axiosAuth;
};

export default useAxiosAuth;