<template>
    <Card custom-class="w-1/3">
        <h1 class="font-semibold text-gray-700 mb-1">{{ title }}</h1>
        <div>
            <BaseInput v-model="newItem" type="text" :placeholder="placeholder" :label="label"
                extraClass="border-gray-400" @keyup.enter="handleAdd" />
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
                getColorByType(type)
            ]">
                {{ item }}
            </label>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { capitalize, ref } from 'vue';
import Card from '@/components/ui/Card/Card.vue';
import BaseInput from '@/components/ui/Input/BaseInput.vue';
import { addCategory, addSubCategory } from '@/services/settings/Categories';
import { showToast } from '@/utils/alerts';

const props = defineProps<{
    title: string;
    placeholder: string;
    label: string;
    buttonText?: string;
    modelValue: string[];
    type: 'income' | 'expense' | 'subcategory';
}>();

const emit = defineEmits<{
    (e: 'added'): void;
}>();

function getColorByType(type: string): string {
    switch (type) {
        case 'income':
            return 'bg-ie-primary-light';
        case 'expense':
            return 'bg-ie-danger-light';
        case 'subcategory':
            return 'bg-ie-secondary';
        default:
            return 'bg-ie-secondary';
    }
}

const newItem = ref('');

const handleAdd = async () => {
    const trimmed = capitalize(newItem.value.trim());

    if (!trimmed) {
        showToast({ message: `Please enter a valid value.`, type: 'warning' });
        return;
    }

    if (props.modelValue.includes(trimmed)) {
        showToast({ message: `"${trimmed}" already exists.`, type: 'warning' });
        return;
    }

    const type = props.type;
    try {
        if (type === 'subcategory') {
            await addSubCategory(trimmed);
        } else {
            await addCategory(trimmed, type);
        }
        emit('added');
        showToast({ message: `${type === 'subcategory' ? 'Subcategory' : 'Category'} "${trimmed}" added successfully!`, type: 'success' });
        newItem.value = '';
    } catch (error) {
        console.error('Error adding category:', error);
        showToast({ message: `Failed to add "${trimmed}".`, type: 'error' });
    }
};
</script>
