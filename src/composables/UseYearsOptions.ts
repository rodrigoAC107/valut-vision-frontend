export function useYearsOptions() {
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - 2
    const endYear = currentYear + 2

    return Array.from({ length: endYear - startYear + 1 }, (_, i) => {
        const year = startYear + i
        return {
            label: String(year),
            value: String(year),
        }
    })
}
