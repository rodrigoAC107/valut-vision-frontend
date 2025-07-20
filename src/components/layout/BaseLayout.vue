<template>
    <div class="flex h-screen">
        <!-- Sidebar a la izquierda -->
        <div class="w-64 bg-[#001d3d] text-white">
            <SideBar />
        </div>

        <!-- Contenido principal -->
        <div class="flex-1 flex flex-col">
            <!-- Header arriba -->
            <div class="h-16 shadow">
                <Header />
            </div>

            <!-- Vista del router en el resto del espacio -->
            <div class="flex-1 overflow-auto px-5 py-4 bg-white">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import SideBar from './SideBar.vue'
</script>
