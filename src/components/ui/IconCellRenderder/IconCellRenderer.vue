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
import { deleteTransaction } from '@/services/transactions/transactions';
import { useSidebarStore } from '@/store/transaction/transactionEditStore';
import { useTransactionNotificationStore } from '@/store/transaction/transactionNotificationStore';
import { showConfirm, showToast } from '@/utils/alerts';

const { notifyDeletion } = useTransactionNotificationStore()

const props = defineProps<{
    params: any
}>()

const handleEdit = () => {
    const store = useSidebarStore()
    store.openSidebar(props.params.data)
}

const handleDelete = async () => {
    const result = await showConfirm({
        title: 'Delete transaction with ID ' + props.params.data._id,
        text: 'Are you sure you want to delete this transaction?',
    });
    if (result?.isConfirmed) {
        try {
            await deleteTransaction(props.params.data._id);
            notifyDeletion();
            showToast({ message: 'Transaction deleted successfully', type: 'success' });
        } catch (error) {
            console.error('Error deleting transaction:', error);
            notifyDeletion();
            showToast({ message: 'Failed to delete transaction', type: 'error' });
        }
    }
}
</script>
