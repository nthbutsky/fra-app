import type { Config } from "tailwindcss";

import plugin from 'tailwindcss/plugin';

const config: Config = {  
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "transparent": "transparent",
      "current": "currentColor",
      "color-1": "rgba(29, 26, 120, 1)",
      "color-1-50": "rgba(29, 26, 120, 0.5)",
      "color-1-05": "rgba(29, 26, 120, 0.05)",
      "color-2": "rgba(60, 54, 218, 1)",
      "color-2-05": "rgba(53, 47, 213, 0.05)",
      "color-3": "rgba(0, 0, 0, 1)",
      "color-4": "rgba(9, 11, 10, 1)",
      "color-5": "rgba(53, 54, 58, 1)",
      "color-6": "rgba(117, 117, 117, 1)",
      "color-7": "rgba(132, 132, 137, 1)",
      "color-8": "rgba(185, 185, 185, 1)",
      "color-9": "rgba(245, 245, 245, 1)",
      "neutral-1-12": "rgba(10, 37, 64, 0.12)",
      "neutral-1-48": "rgba(10, 37, 64, 0.48)",
      "neutral-2": "rgba(255, 255, 255, 1)",
      "neutral-2-25": "rgba(255, 255, 255, 0.25)",
      "neutral-2-50": "rgba(255, 255, 255, 0.5)",
      "neutral-2-60": "rgba(255, 255, 255, 0.6)",
      "neutral-3": "rgba(67, 84, 101, 1)",
      "neutral-3-12": "rgba(67, 84, 101, 0.12)",
      "neutral-3-48": "rgba(67, 84, 101, 0.48)",
      "gradient-1": "linear-gradient(139deg, rgba(60, 54, 218, 1) 0%, rgba(29, 26, 120, 1) 100%)",
      "gradient-2": "linear-gradient(139deg, rgba(60, 54, 218, 0.05) 0%, rgba(60, 54, 218, 0.15) 100%)",
      "success": "rgba(22, 158, 31, 1)",
      "error": "rgba(218, 44, 56, 1)",
      "error-12": "rgba(218, 44, 56, 0.12)",
      "shadow-20": "0px 8px 24px rgba(10, 37, 64, 0.12)",
      "shadow-40": "0px 20px 40px rgba(0, 0, 0, 0.15)",
      "color-lufthansa-1": "rgba(8, 23, 74, 1)",
      "color-lufthansa-1-60": "rgba(8, 23, 74, 0.60)",
      "color-lufthansa-2": "rgba(244, 176, 62, 1)",
      "color-lufthansa-3": "rgba(188, 38, 26, 1)",
      "color-lufthansa-4": "rgba(12, 34, 110, 1)",
      "color-lufthansa-5": "rgba(204, 204, 204, 1)",
      "color-lufthansa-6": "rgba(230, 230, 230, 1)",
    },
    extend: {
      backgroundImage: {
        'gradient-1': "linear-gradient(139deg, rgba(60, 54, 218, 1) 0%, rgba(29, 26, 120, 1) 100%)",
        'gradient-2': "linear-gradient(139deg, rgba(60, 54, 218, 0.05) 0%, rgba(60, 54, 218, 0.15) 100%)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        20: "0px 8px 24px rgba(10, 37, 64, 0.12)",
        40: "0px 20px 40px rgba(0, 0, 0, 0.15)",
      },
      keyframes: {
        'pulse-custom-blue': {
          '0%': {
            'box-shadow': '0 0 0 0 rgba(53, 47, 213, 0.50)',
          },
          '70%': {
            'box-shadow': '0 0 0 4px rgba(53, 47, 213, 0)',
          },
          '100%': {
            'box-shadow': '0 0 0 0 rgba(53, 47, 213, 0)',
          },
        },
        'pulse-custom-green': {
          '0%': {
            'box-shadow': '0 0 0 0 rgba(22, 158, 31, 0.50)',
          },
          '70%': {
            'box-shadow': '0 0 0 4px rgba(22, 158, 31, 0)',
          },
          '100%': {
            'box-shadow': '0 0 0 0 rgba(22, 158, 31, 0)',
          },
        },
        'pulse-custom-red': {
          '0%': {
            'box-shadow': '0 0 0 0 rgba(218, 44, 56, 0.50)',
          },
          '70%': {
            'box-shadow': '0 0 0 4px rgba(218, 44, 56, 0)',
          },
          '100%': {
            'box-shadow': '0 0 0 0 rgba(218, 44, 56, 0)',
          },
        },
        'spin-custom': {
          '0%': {
            transform: 'rotate(180deg)',
          },
          '25%': {
            transform: 'rotate(135deg)',
          },
          '50%': {
            transform: 'rotate(90deg)',
          },
          '75%': {
            transform: 'rotate(45deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
      },
      animation: {
        'pulse-custom-blue': 'pulse-custom-blue 2s ease-in-out infinite',
        'pulse-custom-green': 'pulse-custom-green 2s infinite',
        'pulse-custom-red': 'pulse-custom-red 2s infinite',
        'spin-custom': 'spin-custom 20s linear infinite',
      },
    },
  },
  plugins: [
    plugin(({
      addComponents,
    }:{
      addComponents: Function,
    }) => {
      addComponents({
        ".font-2-header": {
          "font-family": "Archivo",
          "font-style": "normal",
          "font-weight": "500",
          "font-size": "32px",
          "line-height": "125%"
        },
        ".font-3": {
          "font-family": "Inter",
          "font-style": "normal",
          "font-weight": "500",
          "font-size": "18px",
          "line-height": "100%",
          "letter-spacing": "-0.54px"
        },
        ".font-4": {
          "font-family": "Archivo",
          "font-size": "16px",
          "font-weight": "400",
          "line-height": "175%"
        },
        ".font-5": {
          "font-family": "Archivo",
          "font-style": "normal",
          "font-weight": "500",
          "font-size": "16px",
          "line-height": "150%"
        },
        ".font-6": {
          "font-family": "Archivo",
          "font-style": "normal",
          "font-weight": "400",
          "font-size": "16px",
          "line-height": "150%"
        },
          ".font-6-1": {
          "font-family": "Inter",
          "font-style": "normal",
          "font-weight": "600",
          "font-size": "15px",
          "line-height": "120%",
          "letter-spacing": "-0.3px"
        },
        ".font-7": {
          "font-family": "Archivo",
          "font-style": "normal",
          "font-weight": "500",
          "font-size": "14px",
          "line-height": "142.857%"
        },
          ".font-7-1": {
          "font-family": "Inter",
          "font-style": "normal",
          "font-weight": "500",
          "font-size": "14px",
          "line-height": "100%",
          "letter-spacing": "-0.21px"
        },
        ".font-8": {
          "font-family": "Archivo",
          "font-style": "normal",
          "font-weight": "400",
          "font-size": "14px",
          "line-height": "142.857%"
        }, 
        ".font-9": {
          "font-family": "Archivo",
          "font-style": "normal",
          "font-weight": "500",
          "font-size": "11px",
          "line-height": "145.455%"
        }, 
        ".font-10": {
          "font-family": "Archivo",
          "font-style": "normal",
          "font-weight": "500",
          "font-size": "12px",
          "line-height": "100%"
        },
          ".font-11": {
          "font-family": "Inter",
          "font-style": "normal",
          "font-weight": "400",
          "font-size": "12px",
          "line-height": "100%"
        },
          ".font-12": {
          "font-family": "Inter",
          "font-style": "normal",
          "font-weight": "400",
          "font-size": "11px",
          "line-height": "109.091%"
        },
      });
    }),
  ],
};

export default config;
