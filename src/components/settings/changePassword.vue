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
                <button
                    class="bg-ie-primary-light text-white p-2 rounded-md hover:cursor-pointer hover:bg-ie-primary">Change
                    Password</button>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue';
import BaseInput from '@/components/ui/Input/BaseInput.vue';
import { ref } from 'vue';

const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

</script>