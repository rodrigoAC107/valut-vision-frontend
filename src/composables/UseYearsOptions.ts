export function useYearsOptions(range = 5) {
    const currentYear = new Date().getFullYear()

    return Array.from({ length: range }, (_, i) => {
        const year = currentYear - i
        return {
            label: String(year),
            value: String(year)
        }
    })
}
