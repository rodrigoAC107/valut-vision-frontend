import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { AgGridVue } from 'ag-grid-vue3'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router/index.js';

ModuleRegistry.registerModules([AllCommunityModule]);

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.component('AgGridVue', AgGridVue)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
