import api from "@/config/axiosInstance.js";

export type GetTransactionsResponse = {
    _id: string;
    amount: number;
    date: string;          // ISO date string, ej "2025-07-05T10:00:00.000Z"
    categoryId: string;
    type: 'income' | 'expense';
    description: string;
    expenseType: 'fixed' | 'variable' | string | undefined;  // según tus valores posibles
    isDeleted: boolean;
    createdAt: string;      // ISO date string
    updatedAt: string;      // ISO date string
};

export const getTransactions = async (filters = {}): Promise<GetTransactionsResponse[]> => {
    const response = await api.get<GetTransactionsResponse[]>('transactions', {
        params: filters
    });
    return response.data;
};

export const createTransaction = async (data: Omit<GetTransactionsResponse, '_id' | 'createdAt' | 'updatedAt' | 'isDeleted'>): Promise<GetTransactionsResponse> => {
    const response = await api.post<GetTransactionsResponse>('transactions', data);
    return response.data;
}

export const editTransaction = async (id: string, data: Partial<GetTransactionsResponse>): Promise<GetTransactionsResponse> => {
    const response = await api.put<GetTransactionsResponse>(`transactions/${id}`, data);
    return response.data;
}

export const deleteTransaction = async (id: string): Promise<void> => {
    await api.delete<GetTransactionsResponse>(`transactions/${id}`);
}