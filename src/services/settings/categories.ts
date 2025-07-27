import api from "@/config/axiosInstance.js";

export type GetCategoriesResponse = {
    _id: string;
    name: string;
    type: 'income' | 'expense';
    subcategories: string[];
    isDeleted: boolean;
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
}

export type GetSubCategoryResponse = {
    _id: string;
    name: string;
    isDeleted: boolean;
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
}


export const getCategories = async (
    type: string
): Promise<GetCategoriesResponse[]> => {
    const response = await api.get<GetCategoriesResponse[]>('category', { params: { type } });
    return response.data;
};

export const getSubCategory = async (): Promise<GetSubCategoryResponse[]> => {
    const response = await api.get<GetSubCategoryResponse[]>('subcategory');
    return response.data;
};

export const addCategory = async (
    name: string,
    type: 'income' | 'expense',
    subcategories: string[] = []
): Promise<GetCategoriesResponse> => {
    const response = await api.post<GetCategoriesResponse>('category', { name, type, subcategories });
    return response.data;
};

export const addSubCategory = async (
    name: string,
): Promise<GetSubCategoryResponse> => {
    const response = await api.post<GetSubCategoryResponse>('subcategory', { name });
    return response.data;
};
