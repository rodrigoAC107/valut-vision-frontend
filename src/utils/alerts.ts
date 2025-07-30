// src/utils/alerts.ts
import Swal from 'sweetalert2'

interface ConfirmOptions {
    title: string;
    text: string;
    icon?: 'warning' | 'info' | 'success' | 'error' | 'question';
    confirmButtonText?: string;
    cancelButtonText?: string;
}

export const showConfirm = ({
    title,
    text,
    icon = 'warning',
    confirmButtonText = 'Delete',
    cancelButtonText = 'Cancel',
}: ConfirmOptions) => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        background: '#001d3d',
        color: '#a9cce3',
        customClass: {
            confirmButton:
                'py-3 px-6 text-base font-semibold rounded-lg bg-[#1a659e] hover:cursor-pointer hover:bg-[#003566] mx-2',
            cancelButton:
                'py-3 px-6 text-base font-semibold rounded-lg border border-[#1a659e] hover:cursor-pointer hover:bg-[#003566] mx-2',
        },
        buttonsStyling: false,
    });
};

export const showEditPrompt = ({
    title,
    text,
    inputValue,
    confirmButtonText = 'Save',
    cancelButtonText = 'Cancel',
}: {
    title: string;
    text?: string;
    inputValue: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
}) => {
    return Swal.fire({
        title,
        text,
        input: 'text',
        inputValue,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        background: '#001d3d',
        color: '#a9cce3',
        customClass: {
            confirmButton:
                'py-3 px-6 text-base font-semibold rounded-lg bg-[#1a659e] hover:cursor-pointer hover:bg-[#003566] mx-2',
            cancelButton:
                'py-3 px-6 text-base font-semibold rounded-lg border border-[#1a659e] hover:cursor-pointer hover:bg-[#003566] mx-2',
            input: 'py-2 px-3 rounded-md bg-[#003566] text-white placeholder-gray-400 border border-gray-600',
        },
        buttonsStyling: false,
        inputAttributes: {
            autocapitalize: 'on',
            autocomplete: 'off',
        },
        inputValidator: (value) => {
            if (!value.trim()) {
                return 'Please enter a valid value.';
            }
            return null;
        },
    });
};


interface ToastOptions {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number; // en milisegundos
}

export const showToast = ({
    message,
    type = 'success',
    duration = 3000,
}: ToastOptions) => {
    return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: duration,
        timerProgressBar: true,
        background: '#001d3d',
        color: '#a9cce3',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });
};