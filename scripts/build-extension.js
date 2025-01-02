const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Build the React app
console.log("Building React app...");
execSync("npm run build", { stdio: "inherit" });

// Copy manifest.json to build directory
console.log("Copying manifest.json...");
fs.copyFileSync(
  path.join(__dirname, "../manifest.json"),
  path.join(__dirname, "../extension/manifest.json"),
);

// Ensure assets directory exists
const assetsDir = path.join(__dirname, "../extension/assets");
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Copy icons
const iconSizes = [16, 48, 128];
iconSizes.forEach((size) => {
  const sourceIcon = path.join(
    __dirname,
    `../extension/assets/icon${size}.png`,
  );
  const targetIcon = path.join(
    __dirname,
    `../extension/assets/icon${size}.png`,
  );

  if (fs.existsSync(sourceIcon)) {
    fs.copyFileSync(sourceIcon, targetIcon);
  } else {
    console.warn(`Warning: icon${size}.png not found in source directory`);
  }
});

console.log("\nExtension build complete! To test the extension:\n");
console.log("1. Open Chrome and go to chrome://extensions");
console.log("2. Enable Developer mode (top right)");
console.log('3. Click "Load unpacked"');
console.log('4. Select the "extension" folder in your project');
console.log("5. Open a new tab to see your extension in action!");
