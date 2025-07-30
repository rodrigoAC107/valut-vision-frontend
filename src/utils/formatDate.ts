export const dateFormatter = (params: any) => {
    const date = new Date(params.value);
    return new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
};