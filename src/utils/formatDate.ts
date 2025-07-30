export const dateFormatter = (params: any) => {
    const date = new Date(params.value);
    return new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
};

export const normalizeDateRangeForFilter = ([start, end]: Date[]) => {
    const normalized: { startDate?: string; endDate?: string } = {};

    if (start) {
        const s = new Date(start);
        s.setHours(0, 0, 0, 0);
        normalized.startDate = s.toISOString();
    }

    if (end) {
        const e = new Date(end);
        e.setHours(23, 59, 59, 999);
        normalized.endDate = e.toISOString();
    }

    return normalized;
}