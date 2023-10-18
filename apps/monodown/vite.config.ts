import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import solidSvg from "vite-plugin-solid-svg";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

export default defineConfig({
  plugins: [
    mdx({
      jsxImportSource: "solid-jsx",
      providerImportSource: "solid-jsx",
      remarkPlugins: [remarkGfm],
    }),
    solid({
      adapter: vercel({}),
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
