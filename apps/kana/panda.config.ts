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
    extend: {},
  },
  jsxFramework: "solid",
  outdir: "styled-system",
});
