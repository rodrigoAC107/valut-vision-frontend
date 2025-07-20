<template>
    <button :class="[
        'px-4 py-2 rounded-lg font-semibold transition-all duration-200',
        variantClasses,
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-90'
    ]" :disabled="disabled" @click="$emit('click')">
        <slot>
            {{ label }}
        </slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    label?: string
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
}

const props = defineProps<Props>()
defineEmits(['click'])

const variantClasses = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return 'bg-ie-secondary text-white hover:bg-[#5b738f] hover:cursor-pointer'
        case 'danger':
            return 'bg-ie-danger text-white hover:bg-[#e25858] hover:cursor-pointer'
        case 'primary':
        default:
            return 'bg-ie-primary text-white hover:bg-[#335577] hover:cursor-pointer'
    }
})
</script>
