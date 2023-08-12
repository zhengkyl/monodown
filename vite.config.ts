import cloudflare from "solid-start-cloudflare-pages";
import solid from "solid-start/vite";
import UnoCSS from "unocss/vite";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({ adapter: cloudflare({}) }), UnoCSS()],
});
