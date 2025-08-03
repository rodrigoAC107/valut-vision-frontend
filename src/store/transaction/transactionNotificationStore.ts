import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransactionNotificationStore = defineStore('transactionNotification', () => {
    const deleteTrigger = ref(false);

    const notifyDeletion = () => {
        deleteTrigger.value = !deleteTrigger.value
    }

    return {
        deleteTrigger,
        notifyDeletion
    }
})
