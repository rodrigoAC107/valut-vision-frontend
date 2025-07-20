<template>
    <Card custom-class="w-1/3">
        <h1 class="font-semibold text-gray-700 mb-1">{{ title }}</h1>
        <div>
            <BaseInput v-model="newItem" type="text" :placeholder="placeholder" :label="label"
                extraClass="border-gray-400" />
        </div>
        <div class="flex justify-end">
            <button @click="handleAdd"
                class="bg-ie-primary-light text-white p-2 rounded-md hover:cursor-pointer hover:bg-ie-primary">
                {{ buttonText }}
            </button>
        </div>
        <hr class="my-4 border border-gray-200" />
        <div class="max-h-40 flex flex-wrap gap-4 overflow-y-auto py-2">
            <label v-for="(item, index) in modelValue" :key="index" :class="[
                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset',
                getColorByTitle(title)
            ]">
                {{ item }}
            </label>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/ui/Card/Card.vue';
import BaseInput from '@/components/ui/Input/BaseInput.vue';

const props = defineProps<{
    title: string;
    placeholder: string;
    label: string;
    buttonText?: string;
    modelValue: string[];
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
}>();

function getColorByTitle(title: string): string {
    switch (title) {
        case 'Add New Income':
            return 'bg-ie-primary-light';
        case 'Add New Expense':
            return 'bg-ie-danger-light';
        case 'Add New Sub Category':
            return 'bg-ie-secondary';
        default:
            return 'bg-ie-secondary';
    }
}

const newItem = ref('');

function handleAdd() {
    const trimmed = newItem.value.trim();
    if (trimmed && !props.modelValue.includes(trimmed)) {
        emit('update:modelValue', [...props.modelValue, trimmed]);
        newItem.value = '';
    }
}
</script>
