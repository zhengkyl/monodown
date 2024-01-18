import { defineConfig } from "@solidjs/start/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  start: { ssr: false },
  // server: { port: 3002, strictPort: true },
  plugins: [tsconfigPaths({ root: "./" })],
});
