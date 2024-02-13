import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", "@park-ui/panda-preset"],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      keyframes: {
        springUp: {
          "0%": { transform: "translateY(100%)" },
          "80%": { transform: "translateY(-20%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
    },
  },
  staticCss: {
    css: [
      {
        properties: {
          gridColumn: ["1", "2", "3", "4", "5", "6"],
        },
      },
    ],
  },
  jsxFramework: "solid",
  outdir: "styled-system",
});
