import {
  defineConfig,
  presetWind,
  presetIcons,
  transformerVariantGroup,
  transformerDirectives,
} from "unocss";

import { variantMatcher } from "@unocss/preset-mini/utils";

export default defineConfig({
  presets: [presetWind(), presetIcons()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  variants: [
    // desktop active, with same conditions as sticky hover variant
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
  theme: {
    // container: {
    //   center: true,
    //   padding: "2rem",
    //   screens: {
    //     "2xl": "1400px",
    //   },
    // },
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    // keyframes: {
    //   "accordion-down": {
    //     from: { height: 0 },
    //     to: { height: "var(--radix-accordion-content-height)" },
    //   },
    //   "accordion-up": {
    //     from: { height: "var(--radix-accordion-content-height)" },
    //     to: { height: 0 },
    //   },
    // },
    animation: {
      keyframes: {
        /* override default spin which uses transform */
        spin: "{from { rotate: 0deg; } to { rotate: 360deg; }}",
        blink: "{to { opacity: 0%; }}",
        slideDown:
          "{from {height: 0;} to {height: var(--kb-accordion-content-height);}}",
        slideUp:
          "{from {height: var(--kb-accordion-content-height);} to {height: 0;}}",
      },
      durations: {
        blink: "0.8s",
        slideDown: "300ms",
        slideUp: "300ms",
      },
      timingFns: {
        blink: "cubic-bezier(.65,.05,.36,1) ",
        slideDown: "cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      counts: {
        blink: "infinite",
      },
      // "accordion-down": "accordion-down 0.2s ease-out",
      // "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
});
