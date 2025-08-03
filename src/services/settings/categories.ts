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
    type?: string | null
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

// TODO: Remove Subcategory
export const addSubCategory = async (
    name: string,
): Promise<GetSubCategoryResponse> => {
    const response = await api.post<GetSubCategoryResponse>('subcategory', { name });
    return response.data;
};

export const editCategory = async (
    id: string,
    name: string
): Promise<GetCategoriesResponse> => {
    const response = await api.put<GetCategoriesResponse>(`category/${id}`, { name });
    return response.data;
};

// TODO: Remove Subcategory
export const editSubCategory = async (
    id: string,
    name: string
): Promise<GetSubCategoryResponse> => {
    const response = await api.put<GetSubCategoryResponse>(`subcategory/${id}`, { name });
    return response.data;
};

export const removeCategory = async (id: string): Promise<void> => {
    await api.delete(`category/${id}`);
};

// TODO: Remove Subcategory
export const removeSubCategory = async (id: string): Promise<void> => {
    await api.delete(`subcategory/${id}`);
};