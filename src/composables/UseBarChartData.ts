import { computed } from 'vue'
import { useDashboardFilterStore } from '@/store/dashboard/dashboardYearOrMonthStore.js'

// Cantidad de días por mes
const daysInMonth: Record<string, number> = {
    january: 31,
    february: 28, // asumiendo sin bisiestos
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31
}

const monthLabels = Object.keys(daysInMonth).map(
    month => month.charAt(0).toUpperCase() + month.slice(1)
)

const months = Object.keys(daysInMonth) // ['january', 'february', ...]

function generateMonthlyData(): { income: number[]; expense: number[] } {
    return {
        income: months.map(() => Math.floor(Math.random() * 10000 + 5000)),
        expense: months.map(() => Math.floor(Math.random() * 8000 + 2000))
    }
}

function generateDailyData(total: number, days: number): number[] {
    const average = total / days
    return Array.from({ length: days }, () =>
        +(average + (Math.random() * 0.3 - 0.15) * average).toFixed(2)
    )
}

// Cache simple en memoria por año
const yearDataCache: Record<string, { income: number[]; expense: number[] }> = {}

export function useBarChartData() {
    const filterStore = useDashboardFilterStore()

    return computed(() => {
        const selectedYear = filterStore.selectedYearCategory || new Date().getFullYear().toString()
        const selectedCategory = filterStore.selectedCategory
        const selectedMonth = filterStore.selectedMonthCategory?.toLowerCase()

        // Cargar/generar datos del año si no están cacheados
        if (!yearDataCache[selectedYear]) {
            yearDataCache[selectedYear] = generateMonthlyData()
        }

        const yearData = yearDataCache[selectedYear]

        if (selectedCategory === 'year') {
            return {
                labels: monthLabels,
                datasets: [
                    {
                        label: `Income (${selectedYear})`,
                        backgroundColor: '#003049',
                        data: yearData.income
                    },
                    {
                        label: `Expense (${selectedYear})`,
                        backgroundColor: '#d62828',
                        data: yearData.expense
                    }
                ]
            }
        }

        // Gráfico diario si se selecciona un mes
        const idx = months.indexOf(selectedMonth ?? '')
        if (idx !== -1) {
            const days = daysInMonth[months[idx]]
            const dailyLabels = Array.from({ length: days }, (_, i) => `${i + 1}`)

            return {
                labels: dailyLabels,
                datasets: [
                    {
                        label: `Income (${monthLabels[idx]} ${selectedYear})`,
                        backgroundColor: '#003049',
                        data: generateDailyData(yearData.income[idx], days)
                    },
                    {
                        label: `Expense (${monthLabels[idx]} ${selectedYear})`,
                        backgroundColor: '#d62828',
                        data: generateDailyData(yearData.expense[idx], days)
                    }
                ]
            }
        }

        return {
            labels: [],
            datasets: []
        }
    })
}
