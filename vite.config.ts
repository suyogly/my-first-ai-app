import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";
import fs from "fs";

const copyManifest = () => {
  return {
    name: "copy-manifest",
    buildEnd() {
      try {
        const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));

        if (!fs.existsSync("extension")) {
          fs.mkdirSync("extension", { recursive: true });
        }

        fs.writeFileSync(
          "extension/manifest.json",
          JSON.stringify(manifest, null, 2),
        );
      } catch (error) {
        console.error("Error copying manifest:", error);
      }
    },
  };
};

export default defineConfig({
  base: "",
  build: {
    outDir: "extension",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: "iife",
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
      },
    },
    sourcemap: false,
    minify: true,
  },
  plugins: [
    {
      name: "adjust-permissions",
      writeBundle() {
        try {
          fs.chmodSync("extension", 0o755); // Directory permissions
          if (fs.existsSync("extension/assets")) {
            fs.readdirSync("extension/assets").forEach((file) => {
              fs.chmodSync(`extension/assets/${file}`, 0o644); // File permissions
            });
          }
        } catch (error) {
          console.error("Error adjusting permissions:", error);
        }
      },
    },
    react(),
    tempo(),
    copyManifest(),
  ],
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.png"],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "same-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
  },
});
