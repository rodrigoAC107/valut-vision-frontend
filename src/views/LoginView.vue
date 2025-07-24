<template>
    <div class="h-full w-full bg-[#0d3b66] flex items-center justify-center">
        <div
            class="h-2/3 w-1/2 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-gray-200 p-4 flex gap-2">
            <!-- left -->
            <div class="h-full w-1/2 flex flex-col items-center justify-center">
                <div class="flex flex-col items-center justify-center gap-2 mb-4 px-4 text-center">
                    <img src="/favicon.svg" alt="Logo" class="w-12 h-12" />
                    <p class="font-bold text-2xl text-ie-primary">Welcome to Vault Vision</p>
                    <i class="text-sm max-w-md text-ie-primary">
                        Easily keep an eye on your income and expenses. Get simple, clear insights to help you manage
                        your money smarter and feel more in control.
                    </i>
                </div>
                <div class="w-5/6 flex flex-col gap-2 mt-2">
                    <BaseInput v-model="email" type="text" placeholder="Email" label="Email"
                        extraClass="border-gray-400" />
                    <BaseInput v-model="password" type="password" placeholder="Password" label="Password"
                        extraClass="border-gray-400" />
                    <BaseButton @click="handleLogin" variant="primary" label="Login" />
                </div>
            </div>

            <!-- right -->
            <div class="h-full w-1/2 border border-gray-200 rounded-2xl">
                <img src="https://images.pexels.com/photos/133175/pexels-photo-133175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Login illustration" class="w-full h-full mb-6 object-cover rounded-2xl" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';

import { setLocalStorage } from '@/utils/localStorage';
import { login } from '@/services/auth/login';

import BaseInput from '@/components/ui/Input/BaseInput.vue';
import BaseButton from '@/components/ui/Button/BaseButton.vue';
import { showToast } from '@/utils/alerts';

const email = ref('rodrigo@gmail.com')
const password = ref('rodrigo123$')

const handleLogin = async () => {

    try {
        const { token, user } = await login(email.value, password.value);
        // Check if user and token are present
        if (token && user) {
            setLocalStorage('user', user);
            setLocalStorage('token', token);
            showToast({ message: 'Login successful!', type: 'success' });
            router.push({ name: 'Dashboard' });
        } else {
            showToast({ message: 'Login failed!!', type: 'error' });
        }
    } catch (error) {
        console.error('Error en login:', error);
        showToast({ message: 'Login failed!!', type: 'error' });
    }
}

</script>