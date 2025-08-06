<template>
    <div class="space-y-6">
        <h2 class="text-xl font-bold">Create New Transaction</h2>

        <div class="flex flex-row gap-4 w-full">
            <div class="w-1/2 flex item-center flex-col gap-4">
                <BaseInput v-model="form.amount" type="text" label="Amount" extraClass="border-gray-400" />
                <BaseSelect v-model="form.category" :disabled="!form.type" :options="categoryOptions" label="Category"
                    :extraClassInput="'border-gray-400 !rounded !p-2.5 !text-white !mb-3.5'"
                    :extraClassLabel="'!text-white'" />
            </div>

            <div class="w-1/2 flex item-center jusify-center flex-col gap-4">
                <BaseSelect v-model="form.type" :options="typeOptions" label="Type"
                    :extraClassInput="'border-gray-400 !rounded !p-2.5 !text-white !mb-3.5'"
                    :extraClassLabel="'!text-white'" />
                <BaseSelect v-model="form.expenseType" :disabled="form.type !== 'expense'" :options="typeExpenseOptions"
                    label="Expense Type" :extraClassInput="'border-gray-400 !rounded !p-2.5 !text-white !mb-3.5'"
                    :extraClassLabel="'!text-white'" />
            </div>
        </div>

        <div>
            <BaseInput v-model="form.description" type="text" label="Description" extraClass="border-gray-400"
                class="w-full" />
        </div>

        <div class="flex justify-end">
            <button @click="create" :disabled="!form.amount || !form.category || !form.type"
                class="bg-ie-primary text-white px-4 py-2 rounded hover:bg-ie-secondary hover:cursor-pointer">
                Create
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import BaseInput from '@/components/ui/Input/BaseInput.vue'
import BaseSelect from '@/components/ui/Input/BaseSelect.vue'
import { typeExpenseOptions, typeOptions } from '@/utils/options'
import { getCategories } from '@/services/settings/categories'
import { createTransaction } from '@/services/transactions/transactions'
import { showToast } from '@/utils/alerts'
import { useModalCreateStore } from '@/store/transaction/transactionCreateStore'

const store = useModalCreateStore()

const categoryOptions = ref<{ value: string; label: string }[]>([]);
const form = ref<{
    amount: string;
    date: string;
    category: string;
    type: 'expense' | 'income';
    expenseType: string;
    description: string;
}>({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    type: 'income',
    expenseType: '',
    description: ''
});

const emit = defineEmits<{
    (e: 'created'): void;
}>();

onMounted(() => {
    getAllData();
});

const getAllData = async () => {
    const categories = await getCategories();
    categoryOptions.value = categories.map((category) => ({
        value: String(category._id),
        label: category.name,
    }));
}

watch(
    () => form.value.type,
    async (newType, oldType) => {
        if (!newType) return;

        if (oldType === 'expense' && newType !== 'expense') {
            form.value.expenseType = '';
        }

        const categories = await getCategories(newType);
        categoryOptions.value = categories.map((cat) => ({
            value: String(cat._id),
            label: cat.name,
        }));

        form.value.category = '';
    }
)

const create = async () => {
    try {
        const amountNum = Number(form.value.amount);

        if (isNaN(amountNum)) {
            showToast({ message: 'Amount must be a valid number', type: 'error' });
            return;
        }
        const payload = {
            amount: amountNum,
            date: form.value.date,
            categoryId: form.value.category,
            type: form.value.type as 'expense' | 'income',
            expenseType: form.value.expenseType ? form.value.expenseType : undefined,
            description: form.value.description
        };

        await createTransaction(payload);
        emit('created');
        showToast({ message: 'Transaction created successfully', type: 'success' });
        store.closeSidebar();
    } catch (error) {
        console.error('Error updating transaction:', error);
        showToast({ message: 'Failed to create transaction', type: 'error' });
    }
}
</script>
