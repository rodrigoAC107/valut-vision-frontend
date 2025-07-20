<template>
    <Card customClass="w-full">
        <div class="flex flex-col gap-2">
            <div class="flex gap-1">
                <IconMaterialSymbolsBacklightHigh class="w-5 h-5 text-ie-danger" />
                <h2 class="text-sm font-semibold">Top Expense</h2>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-lg font-bold">{{ expense.category }}</span>
                <span class="text-xl font-semibold text-ie-danger">${{ expense.amount.toFixed(2) }}</span>
            </div>
            <p class="text-xs">Transaction made on {{ formatDate(expense.date) }}</p>
        </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue';

defineProps<{
    expense: {
        category: string
        amount: number
        date: string | Date
    }
}>()

function formatDate(date: string | Date): string {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}
</script>
