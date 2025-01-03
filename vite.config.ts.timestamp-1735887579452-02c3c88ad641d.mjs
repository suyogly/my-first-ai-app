// vite.config.ts
import path from "path";
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import react from "file:///app/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { tempo } from "file:///app/node_modules/tempo-devtools/dist/vite/index.js";
import fs from "fs";
var __vite_injected_original_dirname = "/app";
var copyManifest = () => {
  return {
    name: "copy-manifest",
    buildEnd() {
      const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));
      if (!fs.existsSync("extension")) {
        fs.mkdirSync("extension");
      }
      fs.writeFileSync(
        "extension/manifest.json",
        JSON.stringify(manifest, null, 2)
      );
    }
  };
};
var vite_config_default = defineConfig({
  base: "",
  build: {
    outDir: "extension",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: "es",
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  plugins: [
    {
      name: "adjust-permissions",
      writeBundle() {
        fs.chmodSync("extension", 493);
        fs.readdirSync("extension/assets").forEach((file) => {
          fs.chmodSync(`extension/assets/${file}`, 420);
        });
      }
    },
    react(),
    tempo(),
    copyManifest()
  ],
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  assetsInclude: ["**/*.png"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgeyB0ZW1wbyB9IGZyb20gXCJ0ZW1wby1kZXZ0b29scy9kaXN0L3ZpdGVcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcblxuY29uc3QgY29weU1hbmlmZXN0ID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdjb3B5LW1hbmlmZXN0JyxcbiAgICBidWlsZEVuZCgpIHtcbiAgICAgIC8vIFJlYWQgdGhlIG1hbmlmZXN0IGZpbGVcbiAgICAgIGNvbnN0IG1hbmlmZXN0ID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJ21hbmlmZXN0Lmpzb24nLCAndXRmLTgnKSk7XG4gICAgICBcbiAgICAgIC8vIEVuc3VyZSB0aGUgZXh0ZW5zaW9uIGRpcmVjdG9yeSBleGlzdHNcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYygnZXh0ZW5zaW9uJykpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKCdleHRlbnNpb24nKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gV3JpdGUgdGhlIG1hbmlmZXN0IHRvIHRoZSBleHRlbnNpb24gZGlyZWN0b3J5XG4gICAgICBmcy53cml0ZUZpbGVTeW5jKFxuICAgICAgICAnZXh0ZW5zaW9uL21hbmlmZXN0Lmpzb24nLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShtYW5pZmVzdCwgbnVsbCwgMilcbiAgICAgICk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogXCJcIixcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiZXh0ZW5zaW9uXCIsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGZvcm1hdDogXCJlc1wiLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uanNgLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uanNgLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uW2V4dF1gXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6W1xuICAgICAge1xuICAgICAgICBuYW1lOiBcImFkanVzdC1wZXJtaXNzaW9uc1wiLFxuICAgICAgICB3cml0ZUJ1bmRsZSgpIHtcbiAgICAgICAgICBmcy5jaG1vZFN5bmMoXCJleHRlbnNpb25cIiwgMG83NTUpOyAvLyBEaXJlY3RvcnkgcGVybWlzc2lvbnNcbiAgICAgICAgICBmcy5yZWFkZGlyU3luYyhcImV4dGVuc2lvbi9hc3NldHNcIikuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICAgICAgZnMuY2htb2RTeW5jKGBleHRlbnNpb24vYXNzZXRzLyR7ZmlsZX1gLCAwbzY0NCk7IC8vIEZpbGUgcGVybWlzc2lvbnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXG4gICAgcmVhY3QoKSxcbiAgICB0ZW1wbygpLFxuICAgIGNvcHlNYW5pZmVzdCgpXG4gIF0sXG4gIHB1YmxpY0RpcjogXCJwdWJsaWNcIixcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBhc3NldHNJbmNsdWRlOiBbXCIqKi8qLnBuZ1wiXSxcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBOEwsT0FBTyxVQUFVO0FBQy9NLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixTQUFTLGFBQWE7QUFDdEIsT0FBTyxRQUFRO0FBSmYsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxlQUFlLE1BQU07QUFDekIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sV0FBVztBQUVULFlBQU0sV0FBVyxLQUFLLE1BQU0sR0FBRyxhQUFhLGlCQUFpQixPQUFPLENBQUM7QUFHckUsVUFBSSxDQUFDLEdBQUcsV0FBVyxXQUFXLEdBQUc7QUFDL0IsV0FBRyxVQUFVLFdBQVc7QUFBQSxNQUMxQjtBQUdBLFNBQUc7QUFBQSxRQUNEO0FBQUEsUUFDQSxLQUFLLFVBQVUsVUFBVSxNQUFNLENBQUM7QUFBQSxNQUNsQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFRO0FBQUEsSUFDSjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sY0FBYztBQUNaLFdBQUcsVUFBVSxhQUFhLEdBQUs7QUFDL0IsV0FBRyxZQUFZLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxTQUFTO0FBQ25ELGFBQUcsVUFBVSxvQkFBb0IsSUFBSSxJQUFJLEdBQUs7QUFBQSxRQUNoRCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxJQUVGLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxlQUFlLENBQUMsVUFBVTtBQUM1QixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
