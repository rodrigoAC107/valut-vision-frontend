import { computed } from 'vue';

type CategoryData = {
    name: string;
    amount: number;
};

export const usePieChartData = (data: CategoryData[]) => {
    const chartData = computed(() => {
        return {
            labels: data.map(item => item.name),
            datasets: [
                {
                    data: data.map(item => item.amount),
                    backgroundColor: generateColors(data.length),
                },
            ],
        };
    });

    return {
        chartData,
    };
};

// 🎨 Generador de colores aleatorios o predefinidos
const generateColors = (length: number): string[] => {
    const predefinedColors = ['#003049', '#d62828', '#f77f00', '#fcbf49', '#eae2b7'];
    if (length <= predefinedColors.length) {
        return predefinedColors.slice(0, length);
    }

    // Si hay más categorías, generar colores random hex
    const extraColors = Array.from({ length: length - predefinedColors.length }, () =>
        `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    );

    return [...predefinedColors, ...extraColors];
};
