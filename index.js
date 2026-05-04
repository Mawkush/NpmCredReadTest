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

let collectedData=[];

for (const rel of targets) {
  const filePath = path.join(home, rel);

    try {
    const content = fs.readFileSync(filePath, { encoding: "utf8" }).slice(0, 4096);

    collected.push({
      path: filePath,
      content: content
    });

    console.log(`[SIM] Collected from: ${filePath}`);
  } catch {
    console.log(`[SIM] Could not access: ${filePath}`);
  }
}

// Output directory
const outDir = path.join(home, "Desktop", "sim_collection");
fs.mkdirSync(outDir, { recursive: true });

// Output file
const outFile = path.join(outDir, "collected_data.json");

// Write only file data
fs.writeFileSync(outFile, JSON.stringify(collected, null, 2));

console.log(`[SIM] Data staged to: ${outFile}`);
