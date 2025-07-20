// columns.ts
import type { ColDef } from 'ag-grid-community'

import IconCellRenderer from '@/components/ui/IconCellRenderder/IconCellRenderer.vue'

export const transactionColumns: ColDef[] = [
    { headerName: 'ID', field: 'id', sortable: true, filter: false },
    { headerName: 'AMOUNT', field: 'amount', sortable: true, filter: false, cellStyle: { fontWeight: 'bold' } },
    { headerName: 'DATE', field: 'date', sortable: true, filter: false },
    { headerName: 'CATEGORY', field: 'category', sortable: true, filter: false },
    { headerName: 'SUBCATEGORY', field: 'subcategory', sortable: true, filter: false },
    { headerName: 'TYPE', field: 'type', sortable: true, filter: false },
    { headerName: 'DESCRIPTION', field: 'description', sortable: true, filter: false },
    { headerName: 'EXPENSE TYPE', field: 'expenseType', sortable: true, filter: false },
    {
        headerName: 'ACTIONS',
        field: 'action',
        cellRenderer: IconCellRenderer,
        width: 120
    }
]
