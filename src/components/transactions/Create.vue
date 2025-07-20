<!-- components/transactions/Create.vue -->
<template>
    <div class="space-y-4">
        <h2 class="text-xl font-bold">Create New Transaction</h2>
        <div class="flex flex-row gap-4">
            <div class="w-full flex flex-col gap-4">
                <div>
                    <BaseInput v-model="form.amount" type="text" label="Amount" extraClass="border-gray-400" />
                </div>
                <div>
                    <BaseInput v-model="form.category" type="text" label="Category" extraClass="border-gray-400" />
                </div>
                <div>
                    <BaseInput v-model="form.expenseType" type="text" label="Expense Type"
                        extraClass="border-gray-400" />
                </div>
            </div>
            <div class="w-full flex flex-col gap-4">
                <div>
                    <BaseInput v-model="form.subcategory" type="text" label="Subcategory"
                        extraClass="border-gray-400" />
                </div>
                <div>
                    <BaseInput v-model="form.type" type="text" label="Type" extraClass="border-gray-400" />
                </div>
                <div>
                    <BaseInput v-model="form.description" type="text" label="Description"
                        extraClass="border-gray-400" />
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <button @click="create"
                class="bg-ie-primary text-white px-4 py-2 rounded hover:bg-ie-secondary hover:cursor-pointer">
                Create
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSidebarStore } from '@/store/transaction/transactionEditStore'
import BaseInput from '@/components/ui/Input/BaseInput.vue'

const store = useSidebarStore()

const form = ref({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    subcategory: '',
    type: '',
    expenseType: '',
    description: ''
})

const create = () => {
    console.log('Creando transacción:', form.value)
    // Acá podrías llamar a la API o mutar una store global
    store.closeSidebar()
}
</script>
