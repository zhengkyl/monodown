import {
  defineConfig,
  presetWind,
  presetIcons,
  transformerVariantGroup,
} from "unocss";

import { variantMatcher } from "@unocss/preset-mini/utils";

export const getButtonBase = (depth) =>
  `inline-flex justify-center items-center vertical-middle rounded-lg font-semibold shadow-[0_${depth}_0_var(--un-shadow-color)] mb-[${depth}] select-none` +
  ` d-active:(shadow-none translate-y-[${depth}])` +
  ` m-active:(shadow-none translate-y-[${depth}])` +
  ` disabled:(shadow-none translate-y-[${depth}] pointer-events-none)`;

export const btnFill = ([, color]) =>
  getButtonBase("4px") +
  ` bg-${color}-500 shadow-${color}-600 text-white` +
  ` @hover:(bg-opacity-90 shadow-opacity-90)` +
  ` disabled:(bg-stone-200 text-stone-400)`;

export const btnLine = ([, color]) =>
  getButtonBase("2px") +
  ` border-2 shadow-stone-200 border-stone-200 text-dark dark:text-white` +
  ` @hover:(bg-opacity-0 shadow-opacity-90 border-opacity-90 text-opacity-90)` +
  ` disabled:(bg-stone-100 text-stone-400)`;

export const btnLineActive = ([, color]) =>
  `bg-${color}-50 shadow-${color}-500 border-${color}-500 text-${color}-600`;

export default defineConfig({
  presets: [presetWind(), presetIcons()],
  transformers: [transformerVariantGroup()],
  shortcuts: [
    [/^btn-fill-(.*)$/, btnFill],
    [/^btn-line-(.*)$/, btnLine],
    [/^btn-line-(.*)-active$/, btnLineActive],
  ],
  variants: [
    // desktop active, with same conditions as sticky hover variant
    // @ts-expect-error idk it's literally a union containing this type
    variantMatcher("d-active", (input) => {
      return {
        parent: `${
          input.parent ? `${input.parent} $$ ` : ""
        }@media (hover: hover) and (pointer: fine)`,
        selector: `${input.selector || ""}:active`,
      };
    }),
    (matcher) => {
      if (!matcher.startsWith("m-active:")) return matcher;
      return {
        matcher: matcher.slice("m-active:".length),
        selector: (s) => {
          return `.m-active${s}`;
        },
      };
    },
  ],
  // content: {
  //   pipeline: {
  //     include: [/\.tsx($|\?)/, "src/**/*.ts"],
  //     // exclude: []
  //   },
  // },
});
