import {
  defineConfig,
  presetWind,
  presetIcons,
  transformerVariantGroup,
} from "unocss";

const buttonDepth = "4px";

const buttonBase =
  `inline-flex justify-center items-center vertical-middle rounded-lg font-semibold shadow-[0_${buttonDepth}_0_var(--un-shadow-color)] mb-[${buttonDepth}] transition-all duration-75  ease-out select-none` +
  ` active:(shadow-none translate-y-[${buttonDepth}])` +
  ` disabled:(shadow-none translate-y-[${buttonDepth}] pointer-events-none)`;

export default defineConfig({
  presets: [presetWind(), presetIcons()],
  transformers: [transformerVariantGroup()],
  shortcuts: [
    [
      /^btn-fill-(.*)$/,
      ([, color]) =>
        buttonBase +
        ` bg-${color}-500 shadow-${color}-600 text-white` +
        ` @hover:(bg-opacity-90 shadow-opacity-90)` +
        ` disabled:(bg-stone-200 text-stone-400)`,
      ,
    ],
    [
      /^btn-line-(.*)$/,
      ([, color]) =>
        buttonBase +
        ` border-2 shadow-stone-200 border-stone-200 dark:text-white` +
        ` @hover:(bg-${color}-50/10 shadow-${color}-500 border-${color}-500 text-${color}-600)` +
        ` disabled:(bg-stone-100 text-stone-400)`,
    ],
    [
      /^btn-line-(.*)-active$/,
      ([, color]) =>
        `bg-${color}-50 shadow-${color}-500 border-${color}-500 text-${color}-600`,
    ],
  ],
});
