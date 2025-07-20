<template>
    <Card customClass="h-20 w-48">
        <h1 class="font-semibold text-gray-700 mb-1">Change Theme</h1>
        <div class="flex justify-center items-center h-[40px]">
            <SwtichInput v-model="changeTheme" />
        </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue';
import SwtichInput from '../ui/Input/SwtichInput.vue';
import { ref } from 'vue';

const changeTheme = ref(false)
</script>