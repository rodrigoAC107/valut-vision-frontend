import api from "@/config/axiosInstance.js";

type LoginResponse = {
    user: { id: number; name: string; email: string };
    token: string;
};

export const login = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('auth/login', { email, password });
    return response.data;
};
