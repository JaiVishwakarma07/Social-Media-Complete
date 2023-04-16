import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        //TO DO
        // setCurrentUser({ id: 1, name: "rashmika", profilePic: "https://www.bollywoodhungama.com/wp-content/uploads/2022/09/Rashmika-Mandanna-5.jpg" })
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true,
        })
        setCurrentUser(res.data)
    };
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}