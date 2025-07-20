# 📁 Estructura Base para Dashboard de Gastos en Vue 3

## 🧱 Estructura de Directorios

```plaintext
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.vue
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   ├── dashboard/
│   │   ├── SummaryCards.vue
│   │   ├── ExpenseChart.vue
│   │   ├── TransactionsTable.vue
│   │   └── AddExpenseModal.vue
│   ├── ui/
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   └── BaseCard.vue
├── views/
│   ├── Dashboard.vue
│   ├── Reports.vue
│   ├── Settings.vue
├── composables/
│   ├── useTransactions.js
│   └── useSummaryStats.js
├── assets/
│   ├── styles/
│   └── icons/
├── router/
│   └── index.js
├── App.vue
└── main.js
```

---

## 🧠 Recomendaciones Iniciales

### 1. Layout Base

Implementá:

* Sidebar fija con navegación.
* Header con usuario, fecha y filtros.
* Slot principal donde se renderiza el contenido dinámico.

### 2. Dashboard como Vista Principal

```vue
<!-- views/Dashboard.vue -->
<template>
  <Layout>
    <SummaryCards />
    <ExpenseChart />
    <TransactionsTable />
  </Layout>
</template>
```

### 3. Composition API + `<script setup>`

```vue
<script setup>
import { ref } from 'vue'

const transactions = ref([])
</script>
```

### 4. Herramientas Recomendadas

* **TailwindCSS** para estilos rápidos y consistentes.
* **Pinia** si necesitás manejar estado global.
* **Chart.js o ECharts** para representar los datos visualmente.

---

## 🚀 Pro Tips

* Separá lógica de presentación y de negocio: usá `composables/` para cálculos y filtros.
* Mantené los componentes UI atómicos: botón, input, modal, tarjeta.
* Comenzá con un prototipo estático para luego ir incorporando reactividad y conexión con API.

---

## Datos Dashboard

* Mostrar 3 cards que sea ingreso (que sea el titular en pesos arg y en subtitulo los dolares en el dia que se cargo), egresos totales y la ultima que sea la categoria que más se gasta
* Mostrar un pie chart que muestre todos los gastos o los primeros 5 que sean de más cantidad y el ultimo que sea la suma de otros.
* Abajo mostrar un listado de los gastos que mas tienen mostrar solo 5 con su total en una barra o algo de progreso de mayor a menor.
* Mostrar un bar chart de los gastos que se hicieron por dia cuando es mensual, y gastos que se hicieron en cada mes si es anual. Se muestra el total por dia o por mes.

## Datos Transactions

* Boton para agregar transacción que se muestre pop up para agregarlo, al crear la orden, refrescar la tabla.
* Mostrar tabla de lo que se gasto, categoria, pequeña descripcion no mas de 50 caracteres, fecha y acciones (editar, detalle y soft delete)
* Al hacer click en soft delete pop up con pregunta si quiere eliminar o no, titulo y descripcion de lo que se va a eliminar.
* Al ver el detalle de la transacción desplegar sidebar de la derecha con los datos y botones en cerrar o editar.
* Filtro para buscar transacción.

## Datos Settings

* Agregar nueva categoria con una muestra de las que existen.
* Mostrar si queres que el sistema sea tema claro u oscuro.