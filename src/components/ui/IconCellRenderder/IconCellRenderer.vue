// components/IconCellRenderer.vue
<template>
    <div class="flex h-full gap-2 items-center">
        <IconMaterialSymbolsEditOutline class="w-6 h-6 text-ie-primary-light cursor-pointer hover:text-ie-success"
            @click="handleEdit" />
        <IconMaterialSymbolsDeleteOutline class="w-6 h-6 text-ie-primary-light cursor-pointer hover:text-ie-danger"
            @click="handleDelete" />
    </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/store/transaction/transactionEditStore';
import { showConfirm } from '@/utils/alerts';


const props = defineProps<{
    params: any
}>()

const handleEdit = () => {
    const store = useSidebarStore()
    store.openSidebar(props.params.data)
}

const handleDelete = async () => {
    const result = await showConfirm({
        title: 'Delete transaction with ID ' + props.params.data.id,
        text: 'Are you sure you want to delete this transaction?',
    });
    if (result?.isConfirmed) {
        console.log('Confirmado')
    } else {
        console.log('Cancelado')
    }
}
</script>
