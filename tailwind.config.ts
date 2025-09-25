import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        neutral: {
          900: "#02012C",
          800: "#262540",
          700: "#302F4A",
          600: "#3C3B5E",
          300: "#ACACB7",
          200: "#D4D3D9",
          0: "#FFFFFF",
        },
        orange: {
          500: "#FF820A",
        },
        blue: {
          500: "#4658D9",
          700: "#2B19BC",
        },
      },
      spacing: {
        spacing25: "2px",    
        spacing50: "6px",    
        spacing75: "8px",    
        spacing100: "10px",   
        spacing125: "12px",   
        spacing150: "16px",   
        spacing200: "20px",   
        spacing250: "24px",   
        spacing300: "32px",  
        spacing400: "40px",  
        spacing500: "48px",   
        spacing600: "64px",   
        spacing800: "80px",   
        spacing1000: "96px",   
        spacing1200: "112px", 
        spacing1400: "128px", 
        spacing1600: "140px", 
      },
      fontFamily: {
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
        'display': ['var(--font-bricolage)', 'sans-serif'],
      },
    },
  },
} satisfies Config;
