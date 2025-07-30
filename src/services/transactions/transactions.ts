import api from "@/config/axiosInstance.js";

export type GetTransactionsResponse = {
    _id: string;
    amount: number;
    date: string;          // ISO date string, ej "2025-07-05T10:00:00.000Z"
    categoryId: string;
    subcategoryId: string;
    type: 'income' | 'expense';
    description: string;
    expenseType: 'fixed' | 'variable' | string;  // según tus valores posibles
    isDeleted: boolean;
    createdAt: string;      // ISO date string
    updatedAt: string;      // ISO date string
};

export const getTransactions = async (): Promise<GetTransactionsResponse[]> => {
    const response = await api.get<GetTransactionsResponse[]>('transactions');
    return response.data;
};
