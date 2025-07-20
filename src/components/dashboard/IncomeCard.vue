<template>
    <Card customClass="w-full">
        <div class="flex flex-col gap-2">
            <div class="flex gap-1">
                <IconMaterialSymbolsSavingsOutlineRounded class="w-5 h-5 text-ie-primary" />
                <h2 class="text-sm font-semibold">Income</h2>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-lg font-bold">{{ expense.title }}</span>
                <span class="text-xl font-semibold text-ie-primary">${{ expense.amount.toFixed(2) }}</span>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue';

defineProps<{
    expense: {
        title: string
        amount: number
        date?: string | Date
    }
}>()
</script>
