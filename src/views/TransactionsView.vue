<template>
    <div class="h-full w-full flex flex-col p-4">
        <div :class="storeEdit.isOpen ? 'filter blur-sm pointer-events-none select-none' : ''"
            class="flex flex-col flex-grow gap-2">
            <div class="h-1/12 w-full flex">
                <div class="w-3/6 flex gap-4 items-center">
                    <button
                        class="h-12 bg-ie-primary-light text-white p-2 rounded-xl hover:cursor-pointer hover:bg-ie-primary hover:text-white"
                        @click="abrirModal">
                        Create
                    </button>
                    <VueDatePicker v-model="selectedDate" format="dd/MM/yyyy" placeholder="Select a date" range :ui="{
                        wrapper: 'rounded-lg',
                        input: 'h-12 !w-64 !text-sm px-3 !rounded-xl',
                    }" />
                    <BaseSelect v-model="selectedType" :options="typeOptions" title="Select type"
                        extraClassInput="h-12" />
                    <BaseSelect v-model="selectedCategory" :options="categoryOptions" title="Select category"
                        extraClassInput="h-12" />
                    <IconMaterialSymbolsCancelOutline v-if="selectedType || selectedCategory || selectedDate"
                        class="w-24 h-24 text-ie-danger cursor-pointer hover:text-ie-danger-light"
                        @click="clearFilters" />
                </div>
            </div>
            <div class="h-11/12 w-full">
                <DataTable :rowData="transaction" :columnDefs="transactionColumns" />
            </div>
        </div>

        <Edit :visible="storeEdit.isOpen" :data="storeEdit.currentItem" @close-sidebar="storeEdit.closeSidebar()"
            @edited="getTransactionsData" />

        <BaseModal :isOpen="storeCreate.isOpen" :onClose="() => (storeCreate.closeSidebar())">
            <Create @created="getTransactionsData" />
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
import { getCategories, GetCategoriesResponse } from '@/services/settings/categories'
import { getTransactions, GetTransactionsResponse } from '@/services/transactions/transactions'
import { useModalCreateStore } from '@/store/transaction/transactionCreateStore'
import { useSidebarStore } from '@/store/transaction/transactionEditStore'
import { useTransactionNotificationStore } from '@/store/transaction/transactionNotificationStore'
import { normalizeDateRangeForFilter } from '@/utils/formatDate'
import { typeOptions } from '@/utils/options'

import { onMounted, ref, watch } from 'vue'

const storeEdit = useSidebarStore()
const storeCreate = useModalCreateStore()
const selectedDate = ref('')
const selectedType = ref('')
const selectedCategory = ref('');
const categoryOptions = ref<{ value: string; label: string }[]>([]);
const transaction = ref<GetTransactionsResponse[]>([]);

const transactionNotificationStore = useTransactionNotificationStore();

onMounted(async () => {
    await getTransactionsData();
    await getCategoriesData();
});

const getTransactionsData = async () => {
    const filters: { type?: string; categoryId?: string; startDate?: string; endDate?: string } = {};

    if (selectedType.value) filters.type = selectedType.value;
    if (selectedCategory.value) filters.categoryId = selectedCategory.value;
    if (selectedDate.value && Array.isArray(selectedDate.value)) {
        Object.assign(filters, normalizeDateRangeForFilter(selectedDate.value));
    }

    const response = await getTransactions(filters);
    transaction.value = response
}

const getCategoriesData = async () => {
    const categories: GetCategoriesResponse[] = await getCategories(selectedType.value);
    categoryOptions.value = categories.map(cat => ({
        value: cat._id,
        label: cat.name,
    }));
}

watch(
    [selectedType, selectedCategory, selectedDate, () => transactionNotificationStore.deleteTrigger],
    async () => {
        await getTransactionsData();
    }
);

watch(selectedType, async (newType) => {
    if (newType) {
        const categories: GetCategoriesResponse[] = await getCategories(newType);
        categoryOptions.value = categories.map(cat => ({
            value: cat._id,
            label: cat.name,
        }));
        selectedCategory.value = '';
    }
});

const clearFilters = () => {
    selectedType.value = '';
    selectedCategory.value = '';
    categoryOptions.value = [];
    selectedDate.value = '';
    getCategoriesData();
    getTransactionsData();
}

const abrirModal = () => {
    storeCreate.openSidebar()
}

defineOptions({
    name: 'TransactionsView'
})

</script>