<template>
    <Pie :data="chartData" :options="chartOptions" />
</template>


<script setup lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    ChartOptions,
    ChartData,
} from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

defineProps<{
    chartData: ChartData<'pie'>
    chartOptions?: ChartOptions<'pie'>
}>()
</script>