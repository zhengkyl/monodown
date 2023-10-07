import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import solidSvg from "vite-plugin-solid-svg";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
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
