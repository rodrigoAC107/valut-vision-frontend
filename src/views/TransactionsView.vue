<template>
    <div class="h-full w-full flex flex-col p-4">
        <div :class="storeEdit.isOpen ? 'filter blur-sm pointer-events-none select-none' : ''"
            class="flex flex-col flex-grow">
            <div class="h-1/12 w-full flex justify-between">
                <div class="flex gap-4">
                    <button
                        class="h-12 bg-ie-primary-light text-white p-2 rounded-md hover:cursor-pointer hover:bg-ie-primary hover:text-white"
                        @click="abrirModal">
                        Create
                    </button>
                    <VueDatePicker v-model="selectedDate" :range="true" placeholder="Select a date" :ui="{
                        wrapper: 'rounded-lg',
                        input: 'h-12',
                    }" />
                    <BaseSelect v-model="selectedType" :options="typeOptions" title="Select type"
                        extraClassInput="h-12" />
                    <BaseSelect v-model="selectedCategory" :options="categoryOptions" title="Select category"
                        extraClassInput="h-12" />
                </div>
            </div>
            <div class="h-11/12 w-full">
                <DataTable :rowData="transaction" :columnDefs="transactionColumns" />
            </div>
        </div>

        <Edit :visible="storeEdit.isOpen" :data="storeEdit.currentItem" @close-sidebar="storeEdit.closeSidebar()" />

        <BaseModal :isOpen="storeCreate.isOpen" :onClose="() => (storeCreate.closeSidebar())">
            <Create />
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
import Create from '@/components/transactions/Create.vue'
import Edit from '@/components/transactions/Edit.vue'
import BaseSelect from '@/components/ui/Input/BaseSelect.vue'
import BaseModal from '@/components/ui/Modal/BaseModal.vue'
import DataTable from '@/components/ui/Table/DataTable.vue'

import { transactionColumns } from '@/data/transaction/column'
import { transaction } from '@/data/transaction/data'
import { useModalCreateStore } from '@/store/transaction/transactionCreateStore'
import { useSidebarStore } from '@/store/transaction/transactionEditStore'

import { ref } from 'vue'

const storeEdit = useSidebarStore()
const storeCreate = useModalCreateStore()
const selectedDate = ref('')
const selectedCategory = ref('')
const selectedType = ref('')

const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
]

const categoryOptions = [
    { value: 'Category 1', label: 'Category 1' },
    { value: 'Category 2', label: 'Category 2' },
    { value: 'Category 3', label: 'Category 3' },
    { value: 'Category 4', label: 'Category 4' },
    { value: 'Category 5', label: 'Category 5' },
]

const abrirModal = () => {
    storeCreate.openSidebar()
}

defineOptions({
    name: 'TransactionsView'
})

</script>