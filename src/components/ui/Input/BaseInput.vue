<template>
    <div class="mb-4 relative">
        <label v-if="label" class="block text-sm font-medium mb-1">{{ label }}</label>

        <input :type="inputType" :placeholder="placeholder" v-model="internalValue" :class="[
            'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
            extraClass
        ]" />

        <!-- Botón para mostrar/ocultar si es password -->
        <button v-if="type === 'password'" type="button" @click="togglePassword"
            class="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700 hover:cursor-pointer focus:outline-none"
            aria-label="Toggle password visibility">
            <span v-if="isPasswordVisible">
                <IconMaterialSymbolsVisibilityOffOutlineRounded class="w-6 h-6 text-ie-primary" />
            </span>
            <span v-else>
                <IconMaterialSymbolsVisibilityOutlineRounded class="w-6 h-6 text-ie-primary" />
            </span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
    modelValue: string | number
    label?: string
    type?: string
    placeholder?: string
    extraClass?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
}>()

const internalValue = computed({
    get: () => props.modelValue,
    set: (val: string | number) => emit('update:modelValue', val),
})

const isPasswordVisible = ref(false)

const inputType = computed(() => {
    if (props.type === 'password') {
        return isPasswordVisible.value ? 'text' : 'password'
    }
    return props.type || 'text'
})

function togglePassword() {
    isPasswordVisible.value = !isPasswordVisible.value
}
</script>
