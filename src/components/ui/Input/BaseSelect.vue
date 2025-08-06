<template>
    <div class="flex flex-col gap-1 w-full">
        <label v-if="label" :class="['text-sm font-semibold text-gray-600', extraClassLabel]">{{ label }}</label>
        <select :value="modelValue" :disabled="disabled"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
            :class="[extraClassInput, 'border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl px-2 py-1 text-sm text-gray-700']">
            <option disabled value="">{{ title }}</option>
            <option class="text-black" v-for="(opt, index) in options" :key="index" :value="opt.value">
                {{ opt.label }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string,
    title?: string,
    extraClassLabel?: string,
    extraClassInput?: string
    modelValue: string | number,
    options: { label: string, value: string | number }[],
    disabled?: boolean
}>()

defineEmits(['update:modelValue'])

const title = props.title ?? 'Seleccioná una opción'
</script>
