// vite.config.ts
import { defineConfig } from "file:///C:/Users/denni/Desktop/code/rakkas/scribble/node_modules/.pnpm/vite@4.5.0_@types+node@20.8.10/node_modules/vite/dist/node/index.js";
import rakkas from "file:///C:/Users/denni/Desktop/code/rakkas/scribble/node_modules/.pnpm/rakkasjs@0.7.0-next.23_react-dom@18.2.0_react@18.2.0_vite@4.5.0/node_modules/rakkasjs/dist/vite-plugin.js";
import tsconfigPaths from "file:///C:/Users/denni/Desktop/code/rakkas/scribble/node_modules/.pnpm/vite-tsconfig-paths@4.2.1_typescript@5.2.2_vite@4.5.0/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    tsconfigPaths(),
    rakkas({
      adapter: "vercel"
    })
  ],
  server: {
    port: 3e3,
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZW5uaVxcXFxEZXNrdG9wXFxcXGNvZGVcXFxccmFra2FzXFxcXHNjcmliYmxlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZW5uaVxcXFxEZXNrdG9wXFxcXGNvZGVcXFxccmFra2FzXFxcXHNjcmliYmxlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9kZW5uaS9EZXNrdG9wL2NvZGUvcmFra2FzL3NjcmliYmxlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByYWtrYXMgZnJvbSBcInJha2thc2pzL3ZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdHNjb25maWdQYXRocygpLFxuICByYWtrYXMoe1xuICAgIGFkYXB0ZXI6IFwidmVyY2VsXCJcbiAgfSlcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBob3N0OiB0cnVlXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVSxTQUFTLG9CQUFvQjtBQUM5VixPQUFPLFlBQVk7QUFDbkIsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQUMsY0FBYztBQUFBLElBQ3hCLE9BQU87QUFBQSxNQUNMLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxFQUNEO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
