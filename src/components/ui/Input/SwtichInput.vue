<template>
    <label class="flex items-center gap-2 cursor-pointer select-none">
        <span v-if="label" class="text-sm text-gray-700">{{ label }}</span>
        <div class="relative w-10 rounded-full h-6 transition duration-200 ease-in-out"
            :class="modelValue ? 'bg-ie-primary-light' : 'bg-gray-300'" @click="toggle">
            <span
                class="absolute left-0 top-0 h-6 w-6 bg-white border border-gray-300 rounded-full shadow transition-transform duration-200"
                :class="modelValue ? 'translate-x-4' : 'translate-x-0'" />
        </div>
    </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    label: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
    emit('update:modelValue', !props.modelValue)
}
</script>
