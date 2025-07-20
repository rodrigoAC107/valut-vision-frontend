<template>
    <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ChartOptions,
    ChartData,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

defineProps<{
    chartData: ChartData<'bar'>
    chartOptions?: ChartOptions<'bar'>
}>()
</script>