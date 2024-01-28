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
            translate: 0,
            opacity: 1,
          },
          "100%": {
            translate: "-100%",
            opacity: 0,
          },
        },
        slideFromRight: {
          "0%": {
            translate: "100%",
            opacity: 0,
          },
          "100%": {
            translate: 0,
            opacity: 1,
          },
        },
        errorWobble: {
          "0%": {
            translate: 0,
          },
          "25%": {
            translate: "-0.6rem",
          },
          "50%": {
            translate: "0.4rem",
          },
          "75%": {
            translate: "-0.2rem",
          },
          "100%": {
            translate: 0,
          },
        },
        fallIn: {
          "0%": {
            scale: 2,
            opacity: 0,
          },
          "100%": {
            scale: 1,
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
