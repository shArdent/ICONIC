import useAuthStore from "../context/AuthStore"

export const logout = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    setAuth({
        email: "",
        username: "",
        token: "",
        isLoggedIn: false
    });
}