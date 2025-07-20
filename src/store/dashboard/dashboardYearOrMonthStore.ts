// stores/useDashboardFilterStore.ts
import { defineStore } from 'pinia'

const now = new Date();

const nowYear = now.getFullYear().toString();

const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
];
const nowMonth = monthNames[now.getMonth()];

export const useDashboardFilterStore = defineStore('dashboardFilter', {
    state: () => ({
        selectedCategory: 'year',
        selectedYearCategory: nowYear,
        selectedMonthCategory: nowMonth
    }),
    actions: {
        setCategory(category: string) {
            this.selectedCategory = category
        },
        setYearCategory(year: string) {
            this.selectedYearCategory = year
        },
        setMonthCategory(month: string) {
            this.selectedMonthCategory = month
        }
    }
})
