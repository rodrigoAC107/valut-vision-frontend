<template>
    <div class="h-full w-full p-4">
        <div class="flex flex-col gap-4 h-full">
            <div class="flex gap-2 w-full">
                <IncomeCard :expense="{ title: 'Total Income', amount: cardsData.totalIncome }" class="flex-1" />
                <ExpenseCard :expense="{ title: 'Total Expense', amount: cardsData.totalExpense }" class="flex-1" />
                <TopExpenseCard
                    :expense="{ category: cardsData.topExpenseCategory.categoryName, amount: cardsData.topExpenseCategory.total, date: '2025-06-01' }"
                    class="flex-1" />
            </div>
            <div class="flex gap-4 w-full flex-grow h-full">
                <div class="w-2/3 flex flex-col h-full">
                    <Card class="w-128 basis-16 mb-2 flex items-center gap-2">
                        <BaseSelect v-model="selectedCategory" :options="categoryOptions" title="Select Period" />
                        <BaseSelect v-if="selectedCategory === 'month'" v-model="selectedMonthCategory"
                            :options="categoryMonthOptions" title="Select Month" />
                        <BaseSelect v-if="selectedCategory === 'year'" v-model="selectedYearCategory"
                            :options="categoryYearsOptions" title="Select Year" />
                    </Card>
                    <Card class="w-full flex-grow flex items-center justify-center">
                        <BarChart :chart-data="barChartData.chartData.value" />
                    </Card>
                </div>
                <div class="w-1/3 h-full">
                    <Card class="w-full h-full flex items-center justify-center">
                        <PieChart v-if="chartData" :chart-data="chartData" />
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ExpenseCard from '@/components/dashboard/ExpenseCard.vue'
import IncomeCard from '@/components/dashboard/IncomeCard.vue'
import TopExpenseCard from '@/components/dashboard/TopExpenseCard.vue'
import Card from '@/components/ui/Card/Card.vue'
import BarChart from '@/components/ui/Charts/BarChart.vue'
import PieChart from '@/components/ui/Charts/PieChart.vue'
import { usePieChartData } from '@/composables/UsePieChartData'
import BaseSelect from '@/components/ui/Input/BaseSelect.vue'
import { useDashboardFilterStore } from '@/store/dashboard/dashboardYearOrMonthStore'
import { useBarChartData } from '@/composables/UseBarChartData'
import { useYearsOptions } from '@/composables/UseYearsOptions'
import { getDataCards, getTopCategoriesData, ResponseCardData } from '@/services/dashboard/dashhboard'

const barChartData = useBarChartData()

const filterStore = useDashboardFilterStore()

const cardsData = ref<ResponseCardData>({
    totalIncome: 0,
    totalExpense: 0,
    topExpenseCategory: { total: 0, categoryId: '', categoryName: '' },
});

const chartData = ref();

onMounted(async () => {
    await getAllCardData();
    await getPieChartData();
});

const selectedCategory = computed({
    get: () => filterStore.selectedCategory,
    set: (val) => filterStore.setCategory(val),
})

const selectedYearCategory = computed({
    get: () => filterStore.selectedYearCategory,
    set: (val) => filterStore.setYearCategory(val),
})

const selectedMonthCategory = computed({
    get: () => filterStore.selectedMonthCategory,
    set: (val) => filterStore.setMonthCategory(val),
})

const categoryOptions = [
    { label: 'Year', value: 'year' },
    { label: 'Month', value: 'month' },
]

const categoryYearsOptions = useYearsOptions();

const categoryMonthOptions = [
    { label: 'January', value: 'january' },
    { label: 'February', value: 'february' },
    { label: 'March', value: 'march' },
    { label: 'April', value: 'april' },
    { label: 'May', value: 'may' },
    { label: 'June', value: 'june' },
    { label: 'July', value: 'july' },
    { label: 'August', value: 'august' },
    { label: 'September', value: 'september' },
    { label: 'October', value: 'october' },
    { label: 'November', value: 'november' },
    { label: 'December', value: 'december' }
];

const getAllCardData = async () => {
    const response = await getDataCards();
    cardsData.value = {
        totalIncome: response.totalIncome,
        totalExpense: response.totalExpense,
        topExpenseCategory: {
            total: response.topExpenseCategory.total,
            categoryId: response.topExpenseCategory.categoryId,
            categoryName: response.topExpenseCategory.categoryName
        }
    };
}

const getPieChartData = async () => {
    const response = await getTopCategoriesData();

    const dataPieFormat = response.map(item => ({
        name: item.name,
        amount: item.amount
    }));

    const { chartData: pieData } = usePieChartData(dataPieFormat);

    chartData.value = pieData.value;
}

defineOptions({
    name: 'DashboardView',
})
</script>
