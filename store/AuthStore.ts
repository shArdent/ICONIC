import { create } from "zustand";

type UserState = {
    email: string;
    username: string;
    token: string;
    isLoggedIn : boolean;
}

type User = {
    user : UserState
}

type AuthAction = {
    setAuth: (data: UserState) => void;
}

const useAuthStore = create<User & AuthAction>((set) => ({
    user : {
        email: "",
        username: "Diva Marshelano",
        token: "",
        isLoggedIn : false
    },
    setAuth: (data : UserState) => set(() => ({user : {
        email: data.email,
        username: data.username,
        token: data.token,
        isLoggedIn : data.isLoggedIn}}))
}));

export default useAuthStore