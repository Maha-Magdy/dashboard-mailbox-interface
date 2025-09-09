import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        charcoal: {
          50: { value: '#F3F3F4' },
          100: { value: '#C9CED8' },
          200: { value: '#A8B1C3' },
          300: { value: '#8A95A7' },
          400: { value: '#6C798A' },
          500: { value: '#2F4051' },
          600: { value: '#2E3E4F' },
          700: { value: '#2B3A4A' },
          800: { value: '#253746' },
          900: { value: '#1E2934' },
          950: { value: '#0F141A' },
        },
        primary: { value: "#1cb395" },
        secondary: { value: "charcoal.800" },
        teal: {
          600: { value: "#1cb395" }
        },
      },
      fonts: {
        body: { value: "sans-serif" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);