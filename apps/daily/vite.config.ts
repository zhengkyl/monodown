import { defineConfig } from "@solidjs/start/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  start: {
    ssr: false,
    server: {
      preset: "vercel",
    },
  },
  plugins: [tsconfigPaths({ root: "./" })],
});
