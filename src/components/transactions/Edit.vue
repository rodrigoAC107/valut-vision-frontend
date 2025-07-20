<template>
    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0" leave-active-class="transition ease-in duration-300"
        leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 translate-x-full">
        <div v-if="store.isOpen" class="fixed top-0 right-0 w-96 h-full bg-[#001d3d] text-[#e0e1dd] shadow-2xl z-50">
            <div class="flex flex-col h-full">
                <div class="flex justify-between items-center p-4 border-b">
                    <h2 class="text-xl font-bold">Edit Transaction with ID ( {{ form.id }} )</h2>
                    <button @click="store.closeSidebar()"
                        class="text-gray-500 hover:cursor-pointer hover:text-red-500 text-2xl">&times;</button>
                </div>

                <div class="flex-1 overflow-auto p-4 space-y-4" v-if="store.currentItem">
                    <BaseInput v-model="form.amount" type="text" label="Amount" extraClass="border-gray-400" />
                    <BaseInput v-model="form.date" type="text" label="Date" extraClass="border-gray-400" />
                    <BaseInput v-model="form.category" type="text" label="Category" extraClass="border-gray-400" />
                    <BaseInput v-model="form.subcategory" type="text" label="Subcategory"
                        extraClass="border-gray-400" />
                    <BaseInput v-model="form.type" type="text" label="Type" extraClass="border-gray-400" />
                    <BaseInput v-model="form.description" type="text" label="Description"
                        extraClass="border-gray-400" />
                    <BaseInput v-model="form.expenseType" type="text" label="Expense Type"
                        extraClass="border-gray-400" />
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
import { watch, ref } from 'vue'
import { useSidebarStore } from '@/store/transaction/transactionEditStore'
import BaseInput from '@/components/ui/Input/BaseInput.vue'

const store = useSidebarStore()
const form = ref({ ...store.currentItem })

watch(
    () => store.currentItem,
    (newVal) => {
        form.value = { ...newVal }
    },
    { immediate: true }
)

const updateItem = () => {
    console.log('Guardando:', form.value)
    store.closeSidebar()
}
</script>
