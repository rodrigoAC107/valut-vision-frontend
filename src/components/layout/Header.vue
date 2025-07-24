<template>
    <div class="h-screen w-full">
        <div class="flex justify-between items-center p-4 max-w-screen flex-wrap gap-4">
            <div>
                <p class="text-2xl font-bold text-[#415a77]">{{ routerName }}</p>
            </div>
            <div @click="router.push('/dashboard');" class="flex flex-wrap items-center gap-6">
                <div class="flex items-center gap-3 hover:cursor-pointer">
                    <div
                        class="bg-[#1a659e] w-8 h-8 flex items-center justify-center rounded-full text-white text-xs font-semibold">
                        AR
                    </div>
                    <p class="text-sm font-medium text-[#415a77]">Rodrigo Acosta</p>
                </div>
                <div class="hover:cursor-pointer">
                    <IconMaterialSymbolsNotificationsOutline class="w-6 h-6 text-[#1a659e]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const routerName = computed(() => route.name)

</script>
