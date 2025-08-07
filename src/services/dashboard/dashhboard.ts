import api from "@/config/axiosInstance.js";

export type ResponseCardData = {
    totalIncome: number;
    totalExpense: number;
    topExpenseCategory: {
        total: number;
        categoryId: string;
        categoryName: string;
    };
};

export const getDataCards = async (): Promise<ResponseCardData> => {
    const response = await api.get<ResponseCardData>('dashboard/summary-amount');
    return response.data;
}

export const getTopCategoriesData = async (): Promise<{ name: string; amount: number }[]> => {
    const response = await api.get<{ name: string; amount: number }[]>('dashboard/top-categories');
    return response.data;
}

export const getCharBarData = async (year: string, month?: string): Promise<{ income: []; expense: [] }> => {
    const response = await api.get<{ income: []; expense: [] }>('dashboard/transactions-breakdown', { params: { year, month } });
    return response.data;
}