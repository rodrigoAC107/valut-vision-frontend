import api from "@/config/axiosInstance.js"


export const login = async (email: string, password: string) => {
    return await api.get(`auth/login`, {
        params: {
            email,
            password
        }
    })
}