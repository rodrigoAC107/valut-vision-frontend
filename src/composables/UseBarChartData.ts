import { computed, ref, watch } from 'vue'
import { useDashboardFilterStore } from '@/store/dashboard/dashboardYearOrMonthStore.js'
import { getCharBarData } from '@/services/dashboard/dashhboard.js'

// Etiquetas de meses para gráficos anuales
const monthLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

// Días por mes para gráficos mensuales
const daysInMonth: Record<string, number> = {
    january: 31, february: 28, march: 31, april: 30, may: 31, june: 30,
    july: 31, august: 31, september: 30, october: 31, november: 30, december: 31
}

export function useBarChartData() {
    const filterStore = useDashboardFilterStore()

    const realChartData = ref({
        labels: [] as string[],
        datasets: [] as { label: string; backgroundColor: string; data: number[] }[],
    })

    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchData = async () => {
        loading.value = true
        error.value = null

        try {
            let response = { income: [], expense: [] }
            let year = filterStore.selectedYearCategory || new Date().getFullYear().toString()
            const category = filterStore.selectedCategory
            const month = filterStore.selectedMonthCategory?.toLowerCase()

            let numericMonth: string | undefined = undefined;

            if (category === 'month' && month) {
                year = new Date().getFullYear().toString();
                const monthIndex = monthLabels.findIndex(
                    m => m.toLowerCase() === month.toLowerCase()
                );

                if (monthIndex !== -1) {
                    numericMonth = (monthIndex + 1).toString();
                } else {
                    throw new Error(`Invalid month name: ${month}`);
                }
            }

            if (category === 'year') {
                response = await getCharBarData(year)
            } else {
                response = await getCharBarData(year, numericMonth)
            }


            if (category === 'year') {
                // Labels meses, y datos slice a 12 meses por si acaso
                realChartData.value = {
                    labels: monthLabels,
                    datasets: [
                        {
                            label: `Income (${year})`,
                            backgroundColor: '#003049',
                            data: response.income.slice(0, 12),
                        },
                        {
                            label: `Expense (${year})`,
                            backgroundColor: '#d62828',
                            data: response.expense.slice(0, 12),
                        },
                    ],
                }
            } else if (category === 'month' && month) {
                // Etiquetas días del mes
                const days = daysInMonth[month] || 30
                const dailyLabels = Array.from({ length: days }, (_, i) => `${i + 1}`)

                realChartData.value = {
                    labels: dailyLabels,
                    datasets: [
                        {
                            label: `Income (${month.charAt(0).toUpperCase() + month.slice(1)} ${year})`,
                            backgroundColor: '#003049',
                            data: response.income.slice(0, days),
                        },
                        {
                            label: `Expense (${month.charAt(0).toUpperCase() + month.slice(1)} ${year})`,
                            backgroundColor: '#d62828',
                            data: response.expense.slice(0, days),
                        },
                    ],
                }
            } else {
                realChartData.value = { labels: [], datasets: [] }
            }
        } catch (err: any) {
            error.value = err.message || 'Error fetching chart data'
            realChartData.value = { labels: [], datasets: [] }
        } finally {
            loading.value = false
        }
    }

    watch(
        () => [filterStore.selectedCategory, filterStore.selectedYearCategory, filterStore.selectedMonthCategory],
        fetchData,
        { immediate: true }
    )

    return {
        chartData: computed(() => realChartData.value)
    }
}
