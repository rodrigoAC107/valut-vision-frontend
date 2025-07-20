import { createRouter, createWebHistory } from 'vue-router'

import BaseLayout from '../components/layout/BaseLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import TransactionsView from '../views/TransactionsView.vue'
import SettingsView from '../views/SettingsView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
    {
        path: '/',
        component: BaseLayout,
        children: [
            {
                path: '',
                redirect: '/dashboard'
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: DashboardView
            },
            {
                path: 'transactions',
                name: 'Transactions',
                component: TransactionsView
            },
            {
                path: 'settings',
                name: 'Settings',
                component: SettingsView
            },
            {
                path: 'profile',
                name: 'Profile',
                component: ProfileView
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// TODO: PROTECCION DE RUTAS
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token') // o desde Pinia
//   if (to.name !== 'Login' && !isAuthenticated) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

export default router
