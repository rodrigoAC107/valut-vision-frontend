<template>
    <div class="h-full flex flex-col justify-between">
        <div class="flex justify-center items-center mt-4">
            <img src="/favicon.svg" alt="Logo" class="w-20 h-20" />
        </div>
        <!-- Contenido centrado verticalmente -->
        <div class="flex-1 flex flex-col justify-center pl-4 py-2">
            <router-link to="dashboard" :class="[
                'my-2 p-2 flex gap-2 items-center hover:bg-[#003566]',
                $route.name === 'Dashboard' ? 'font-bold bg-[#003566]' : ''
            ]">
                <IconMaterialSymbolsSpaceDashboardOutline class="w-6 h-6 text-ie-primary-light" />
                <p>Dashboard</p>
            </router-link>

            <router-link to="transactions" :class="[
                'my-2 p-2 flex gap-2 items-center hover:bg-[#003566]',
                $route.name === 'Transactions' ? 'font-bold bg-[#003566]' : ''
            ]">
                <IconIconParkOutlineTransactionOrder class="w-6 h-6 text-ie-primary-light" />
                <p>Transactions</p>
            </router-link>

            <router-link to="settings" :class="[
                'my-2 p-2 flex gap-2 items-center hover:bg-[#003566]',
                $route.name === 'Settings' ? 'font-bold bg-[#003566]' : ''
            ]">
                <IconMaterialSymbolsSettings class="w-6 h-6 text-ie-primary-light" />
                <p>Settings</p>
            </router-link>
        </div>

        <!-- Logout pegado abajo -->
        <div class="w-full mb-4 pl-4">
            <button @click="handleLogout"
                class="w-full my-2 p-2 flex gap-2 items-center text-white hover:bg-ie-danger group hover:cursor-pointer rounded">
                <IconMaterialSymbolsLogout class="w-6 h-6 text-ie-danger group-hover:text-white" />
                <p class="group-hover:text-white text-white">Logout</p>
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
import { showConfirm, showToast } from '@/utils/alerts';
import { clearLocalStorage } from '@/utils/localStorage';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    const user = localStorage.getItem('user');
    if (!user) {
        showToast({ message: 'Please log in first', type: 'error' });
        router.push('/login');
    }
});

const handleLogout = async () => {
    const result = await showConfirm({
        title: 'Log out',
        text: 'Are you sure you want to log out?',
        confirmButtonText: 'Logout',
    });
    if (result?.isConfirmed) {
        clearLocalStorage();
        router.push('/login')
    }
}
</script>
