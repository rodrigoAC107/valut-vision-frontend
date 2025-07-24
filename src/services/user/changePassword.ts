import api from "@/config/axiosInstance.js";

type UpdatePasswordResponse = {
    message: string;
    user: { id: number; name: string; email: string };
};

export const updatePassword = async (
    email: string,
    password: string,
    newPassword: string,
    confirmPassword: string
): Promise<UpdatePasswordResponse> => {
    const response = await api.put<UpdatePasswordResponse>('user/update-password', { email, password, newPassword, confirmPassword });
    return response.data;
};
