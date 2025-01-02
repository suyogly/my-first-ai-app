import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";
import fs from "fs";

const copyManifest = () => {
  return {
    name: 'copy-manifest',
    buildEnd() {
      // Read the manifest file
      const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf-8'));
      
      // Ensure the extension directory exists
      if (!fs.existsSync('extension')) {
        fs.mkdirSync('extension');
      }
      
      // Write the manifest to the extension directory
      fs.writeFileSync(
        'extension/manifest.json',
        JSON.stringify(manifest, null, 2)
      );
    }
  };
};

export default defineConfig({
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
      },
    },
  },
  plugins:[
      {
        name: "adjust-permissions",
        writeBundle() {
          fs.chmodSync("extension", 0o755); // Directory permissions
          fs.readdirSync("extension/assets").forEach((file) => {
            fs.chmodSync(`extension/assets/${file}`, 0o644); // File permissions
          });
        },
      },
    
    react(),
    tempo(),
    copyManifest()
  ],
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.png"],
});