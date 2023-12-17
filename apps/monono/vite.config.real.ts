import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import solidSvg from "vite-plugin-solid-svg";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import unpluginSolidMarked from "unplugin-solid-marked";

// Can't import .ts from monorepo into vite.config.ts
// https://github.com/vitejs/vite/issues/5370
//
// 1. relative import but only 1 ts import level deep
// 2. import-single-ts, using a proxy file
// 3. bun, which supports ts directly

export default defineConfig({
  plugins: [
    unpluginSolidMarked.vite({}),
    solid({
      adapter: vercel({}),
      extensions: [".mdx"],
    }),
    UnoCSS(),
    solidSvg({
      svgo: {
        enabled: false, // figure out later
      },
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
  },
});
