<!-- components/ui/Card.vue -->
<template>
    <div class="bg-white shadow-md border-l-4 border-ie-primary-light p-2 rounded" :class="customClass">
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps({
    customClass: {
        type: String,
        default: '',
    },
});
</script>
