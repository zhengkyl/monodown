import {
  defineConfig,
  presetWind,
  presetIcons,
  transformerVariantGroup,
} from "unocss";
import { btnFill, btnLine, btnLineActive } from "./src/styles/button";

export default defineConfig({
  presets: [presetWind(), presetIcons()],
  transformers: [transformerVariantGroup()],
  shortcuts: [
    [/^btn-fill-(.*)$/, btnFill],
    [/^btn-line-(.*)$/, btnLine],
    [/^btn-line-(.*)-active$/, btnLineActive],
  ],
  content: {
    pipeline: {
      include: [/\.tsx($|\?)/, "src/**/*.ts"],
      // exclude: []
    },
  },
});
