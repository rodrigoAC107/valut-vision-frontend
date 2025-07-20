// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{vue,js,ts}'],
    theme: {
        extend: {
            colors: {
                'ie-primary': '#003049',
                'ie-secondary': '#415a77',
                'ie-danger': '#d62828',
                'ie-warning': '#f77f00',
                'ie-success': '#a7c957',
                'ie-primary-light': '#0077b6',
                'ie-danger-light': '#ef233c',
            },
        },
    },
    plugins: [],
}

export default config