import {
  defineConfig,
  presetWind,
  presetIcons,
  transformerVariantGroup,
} from "unocss";

import { variantMatcher } from "@unocss/preset-mini/utils";

export default defineConfig({
  presets: [presetWind(), presetIcons()],
  transformers: [transformerVariantGroup()],
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
});
