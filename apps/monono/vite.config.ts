import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import solidSvg from "vite-plugin-solid-svg";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import solidMarkedPlugin from "vite-plugin-solid-marked";

export default defineConfig({
  plugins: [
    solid({
      adapter: vercel({}),
      extensions: [".mdx"],
    }),
    solidMarkedPlugin({}),
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
