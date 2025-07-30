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
            <label v-for="(item) in modelValue" :key="item.id" :class="[
                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset select-none hover:cursor-pointer gap-1',
                getColorByType(type)
            ]" @click="editItem(item)">
                {{ item.name }}
                <span class="ml-1 text-white hover:text-red-400 hover:font-bold select-none"
                    @click.stop="removeItem(item)">
                    ×
                </span>
            </label>


        </div>
    </Card>
</template>

<script setup lang="ts">
import { capitalize, ref } from 'vue';
import Card from '@/components/ui/Card/Card.vue';
import BaseInput from '@/components/ui/Input/BaseInput.vue';
import { addCategory, addSubCategory, editCategory, editSubCategory, removeCategory, removeSubCategory } from '@/services/settings/categories';
import { showConfirm, showEditPrompt, showToast } from '@/utils/alerts';

const props = defineProps<{
    title: string;
    placeholder: string;
    label: string;
    buttonText?: string;
    modelValue: { id: string; name: string }[];
    type: 'income' | 'expense' | 'subcategory';
}>();

const newItem = ref('');

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

const editItem = async (item: { id: string; name: string }) => {

    const result = await showEditPrompt({
        title: 'Edit',
        text: 'Change the item name below:',
        inputValue: item.name,
        confirmButtonText: 'Edit',
    });

    if (result.isConfirmed && result.value.trim()) {
        const newName = result.value.trim();
        try {
            if (props.type === 'subcategory') {
                await editSubCategory(item.id, newName);
            } else {
                await editCategory(item.id, newName);
            }
            emit('added');
            showToast({ message: `"${newName}" edited successfully!`, type: 'success' });
        } catch (error) {
            console.error('Error editting item:', error);
            showToast({ message: `Failed to edit "${newName}".`, type: 'error' });
        }
    }
}


const removeItem = async (item: { id: string; name: string }) => {
    const result = await showConfirm({
        title: 'Remove',
        text: `Are you sure you want to remove "${item.name}"?`,
        confirmButtonText: 'Remove',
    });

    if (result?.isConfirmed) {
        try {
            if (props.type === 'subcategory') {
                await removeSubCategory(item.id);
            } else {
                await removeCategory(item.id);
            }
            emit('added');
            showToast({ message: `"${item.name}" removed successfully!`, type: 'success' });
        } catch (error) {
            console.error('Error removing item:', error);
            showToast({ message: `Failed to remove "${item.name}".`, type: 'error' });
        }
    }
}

const handleAdd = async () => {
    const trimmed = capitalize(newItem.value.trim());

    if (!trimmed) {
        showToast({ message: `Please enter a valid value.`, type: 'warning' });
        return;
    }

    if (props.modelValue.some(item => item.name.toLowerCase() === trimmed.toLowerCase())) {
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
