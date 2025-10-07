import { createContext, useEffect, useState } from "react";
import { login } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token });
        }
    }, []);

    const handleLogin = async (email, password, callback) => {
        const res = await login({email, password});
        localStorage.setItem("token", res.data.token);
        console.log(res)
        setUser(res.data.user);
        callback(res.data)
        return res.data
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}