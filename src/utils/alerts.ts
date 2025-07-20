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
