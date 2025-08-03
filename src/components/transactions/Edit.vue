<template>
    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0" leave-active-class="transition ease-in duration-300"
        leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 translate-x-full">
        <div v-if="store.isOpen" class="fixed top-0 right-0 w-96 h-full bg-[#001d3d] text-[#e0e1dd] shadow-2xl z-50">
            <div class="flex flex-col h-full">
                <div class="flex justify-between items-center p-4 border-b">
                    <h2 class="text-xl font-bold">Edit Transaction with ID ( {{ form._id }} )</h2>
                    <button @click="store.closeSidebar()"
                        class="text-gray-500 hover:cursor-pointer hover:text-red-500 text-2xl">&times;</button>
                </div>

                <div class="flex-1 overflow-auto p-4 space-y-4" v-if="store.currentItem">
                    <BaseInput v-model="form.amount" type="text" label="Amount" extraClass="border-gray-400" />
                    <BaseInput v-model="formattedDate" type="text" label="Date" extraClass="border-gray-400" />
                    <BaseSelect v-model="form.type" :options="typeOptions" label="Type"
                        :extraClassInput="'border-gray-400 !rounded !p-2 !text-white'"
                        :extraClassLabel="'!text-white'" />
                    <BaseSelect v-model="form.categoryId" :options="categoryOptions" label="Category"
                        :extraClassInput="'border-gray-400 !rounded !p-2 !text-white'"
                        :extraClassLabel="'!text-white'" />
                    <BaseInput v-model="form.description" type="text" label="Description"
                        extraClass="border-gray-400 capitalize" />
                    <BaseSelect v-if="form.type === 'expense'" v-model="form.expenseType" :options="typeExpenseOptions"
                        label="Category" :extraClassInput="'border-gray-400 !rounded !p-2 !text-white'"
                        :extraClassLabel="'!text-white'" />
                </div>

                <div class="flex gap-4 p-4">
                    <button @click="updateItem"
                        class="w-full bg-ie-primary-light text-white px-4 py-2 rounded hover:bg-ie-primary hover:cursor-pointer">
                        Update
                    </button>
                    <button @click="store.closeSidebar()"
                        class="w-full text-white px-4 py-2 rounded border hover:bg-ie-primary hover:cursor-pointer">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, computed } from 'vue'
import BaseSelect from '../ui/Input/BaseSelect.vue'
import { useSidebarStore } from '@/store/transaction/transactionEditStore'
import BaseInput from '@/components/ui/Input/BaseInput.vue'
import { getCategories, GetCategoriesResponse } from '@/services/settings/categories'
import { dateFormatter } from '@/utils/formatDate'
import { editTransaction } from '@/services/transactions/transactions'
import { showToast } from '@/utils/alerts'

const store = useSidebarStore()
const form = ref({ ...store.currentItem })
const categoryOptions = ref<{ value: string; label: string }[]>([]);

const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
];

const typeExpenseOptions = [
    { value: 'variable', label: 'Variable' },
    { value: 'fixed', label: 'Fixed' },
];

const emit = defineEmits<{
    (e: 'edited'): void;
}>();

onMounted(async () => {
    await loadCategoriesByType();
});

const loadCategoriesByType = async (type: string | null = null) => {
    const categories: GetCategoriesResponse[] = await getCategories(type);
    categoryOptions.value = categories.map(cat => ({
        value: String(cat._id),
        label: cat.name,
    }));
}

const formattedDate = computed({
    get() {
        if (!form.value.date) return '';
        return dateFormatter(form.value.date);
    },
    set(val: string) {
        const parts = val.split('/');
        if (parts.length === 3) {
            const [day, month, year] = parts;
            form.value.date = new Date(+year, +month - 1, +day);
        } else {
            form.value.date = null;
        }
    }
});

const findCategoryIdByName = (categoryName: string): string => {
    const match = categoryOptions.value.find(c => c.label === categoryName);
    return match ? match.value : '';
}

watch(
    () => store.currentItem,
    async (newVal) => {
        if (!newVal) return;
        form.value = {
            ...newVal,
            categoryId: findCategoryIdByName(newVal.category),
            type: String(newVal.type),
            expenseType: String(newVal.expenseType),
        };

        await loadCategoriesByType(newVal.type);
    },
    { immediate: true }
);

watch(
    () => form.value.type,
    async (newType) => {
        if (!newType) return;
        await loadCategoriesByType(newType);
    }
);

const updateItem = async () => {
    try {
        await editTransaction(form.value._id, form.value);
        emit('edited');
        store.closeSidebar();
        showToast({ message: 'Transaction updated successfully', type: 'success' });
    } catch (error) {
        console.error('Error updating transaction:', error);
        showToast({ message: 'Failed to update transaction', type: 'error' });
    }
}
</script>
