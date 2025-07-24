<template>
    <Card custom-class="w-1/3">
        <h1 class="font-semibold text-gray-700 mb-1">Change Password</h1>
        <div class="flex flex-col">
            <div>
                <BaseInput v-model="currentPassword" type="password" placeholder="Current Password"
                    label="Current Password" extraClass="border-gray-400" />
            </div>
            <div>
                <BaseInput v-model="newPassword" type="password" placeholder="New Password" label="New Password"
                    extraClass="border-gray-400" />
            </div>
            <div>
                <BaseInput v-model="confirmNewPassword" type="password" placeholder="Confirm New Password"
                    label="Confirm New Password" extraClass="border-gray-400" />
            </div>
            <div class="flex justify-end">
                <button @click="handleUpdatePassword" :disabled="isDisabled" :class="[
                    'bg-ie-primary-light text-white p-2 rounded-md',
                    isDisabled ? 'bg-ie-secondary' : 'hover:cursor-pointer hover:bg-ie-primary'
                ]">Change Password
                </button>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Card from '@/components/ui/Card/Card.vue';
import BaseInput from '@/components/ui/Input/BaseInput.vue';

import { updatePassword } from '@/services/user/changePassword';
import { getLocalStorage } from '@/utils/localStorage';
import { showToast } from '@/utils/alerts';

const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const { email } = getLocalStorage('user');

const isDisabled = computed(() =>
    !currentPassword.value ||
    !newPassword.value ||
    !confirmNewPassword.value
);

const handleUpdatePassword = async () => {

    if (newPassword.value !== confirmNewPassword.value) {
        showToast({ message: 'New and confirm new passwords do not match', type: 'error' });
        return;
    }

    if (newPassword.value === currentPassword.value) {
        showToast({ message: 'New password cannot be the same as the current password', type: 'error' });
        return;
    }

    try {
        const response = await updatePassword(email, currentPassword.value, newPassword.value, confirmNewPassword.value);
        console.log('Password updated successfully:', response);
        showToast({ message: 'Password updated successfully', type: 'success' });
        currentPassword.value = '';
        newPassword.value = '';
        confirmNewPassword.value = '';
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Error updating password. Please try again.';
        showToast({ message, type: 'error' });
    }
};

</script>