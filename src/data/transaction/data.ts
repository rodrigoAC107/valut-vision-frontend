// data.ts
import type { Transaction } from './type.ts'

export const transaction: Transaction[] = [
    {
        id: 1,
        amount: 100,
        date: '2023-01-01',
        category: 'Category 1',
        subcategory: 'Subcategory 1',
        type: 'income',
        description: 'Description 1',
        expenseType: 'fixed',
        action: 'action 1',
    },
]
