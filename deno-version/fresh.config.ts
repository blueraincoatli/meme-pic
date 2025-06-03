import { defineConfig } from "$fresh/server.ts";

export default defineConfig({
  // 允许跨域请求
  server: {
    port: 8000,
  },
}); 