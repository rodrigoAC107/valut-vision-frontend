// types.ts
export interface Transaction {
    id: number
    amount: number
    date: string
    category: string
    subcategory: string
    type: string
    description: string
    expenseType: string
    action: string
}
