<template>
    <AgGridVue class="ag-theme-alpine" style="width: 100%; height: 100%" :rowData="rowData" :columnDefs="columnDefs"
        :defaultColDef="defaultColDef" :theme="theme" :pagination="true" :paginationPageSize="paginationPageSize"
        :paginationPageSizeSelector="paginationPageSizeSelector"> </AgGridVue>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import type { ColDef } from 'ag-grid-community'
import { themeQuartz, Theme } from 'ag-grid-community'


// configurate custom theme
const myBlueTheme = themeQuartz.withParams({
    backgroundColor: '#001d3d',               // Azul oscuro profundo (fondo)
    foregroundColor: '#a9cce3',               // Azul claro para textos
    headerTextColor: '#d0e6ff',               // Azul muy claro para textos de encabezado
    headerBackgroundColor: '#023e8a',         // Azul medio fuerte para encabezado
    oddRowBackgroundColor: 'rgba(2, 62, 138, 0.15)',  // Azul transparente suave para filas impares
    headerColumnResizeHandleColor: '#053a73', // Azul intenso para el handle de redimensionar
})

const theme = ref<Theme | "legacy">(myBlueTheme);

// sets 10 rows per page (default is 100)
const paginationPageSize = 10;

// allows the user to select the page size from a predefined list of page sizes
const paginationPageSizeSelector = [10, 20, 50, 100];

withDefaults(defineProps<{
    rowData?: any[]
    columnDefs?: ColDef[]
}>(), {
    rowData: () => [],
    columnDefs: () => []
})

// Tipado para columnas por defecto
const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
}
</script>
