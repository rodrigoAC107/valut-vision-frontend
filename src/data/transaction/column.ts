// columns.ts
import type { ColDef } from 'ag-grid-community'

import IconCellRenderer from '@/components/ui/IconCellRenderder/IconCellRenderer.vue'
import { dateFormatter } from '@/utils/formatDate.js'

export const transactionColumns: ColDef[] = [
    { headerName: 'ID', field: '_id', sortable: true, filter: false, cellClass: '!min-w-64 px-2' },
    { headerName: 'AMOUNT', field: 'amount', sortable: true, filter: false, cellStyle: { fontWeight: 'bold' } },
    { headerName: 'DATE', field: 'createdAt', sortable: true, filter: false, valueFormatter: dateFormatter },
    { headerName: 'CATEGORY', field: 'category', sortable: true, filter: false, cellClass: 'capitalize' },
    { headerName: 'TYPE', field: 'type', sortable: true, filter: false, cellClass: 'capitalize' },
    { headerName: 'EXPENSE TYPE', field: 'expenseType', sortable: true, filter: false, cellClass: 'capitalize' },
    {
        headerName: 'ACTIONS',
        field: 'action',
        cellRenderer: IconCellRenderer,
        width: 120
    }
]
