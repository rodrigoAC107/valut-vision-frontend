<template>
    <Card customClass="h-20 w-48">
        <h1 class="font-semibold text-gray-700 mb-1">Change Lenguage</h1>
        <div class="flex justify-center items-center h-[40px]">
            <BaseSelect v-model="selectedLenguage" :options="lenguageOptions" title="Select Lenguage" />
        </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue';
import { useSettingStore } from '@/store/settings/settingStore';
import { computed } from 'vue';

const settingStore = useSettingStore()

const selectedLenguage = computed({
    get: () => settingStore.selectedLenguage,
    set: (val) => settingStore.setLenguage(val),
})

const lenguageOptions = [
    {
        value: 'en',
        label: 'English'
    },
    {
        value: 'es',
        label: 'Spanish'
    }
]

</script>