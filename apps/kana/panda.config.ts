import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";

import { button } from "./src/theme/recipes/button";

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({
      accentColor: "neutral",
      grayColor: "neutral",
      borderRadius: "md",
    }),
  ],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    recipes: {
      button: button,
    },
    extend: {
      keyframes: {
        slideLeft: {
          "0%": {
            marginLeft: "0",
            opacity: 1,
          },
          "100%": {
            marginLeft: "-100%",
            opacity: 0,
          },
        },
        slideFromRight: {
          "0%": {
            marginLeft: "100%",
            opacity: 0,
          },
          "100%": {
            marginLeft: "0",
            opacity: 1,
          },
        },
      },
    },
  },
  staticCss: {
    css: [
      {
        properties: {
          // app.ts -> not generating classname used in ternary
          // probably bug in pandacss, since it should be statically analyzed
          opacity: [0],
        },
      },
    ],
  },
  jsxFramework: "solid",
  outdir: "styled-system",
});
