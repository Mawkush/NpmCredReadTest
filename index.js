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

for (const rel of targets) {
  const filePath = path.join(home, rel);

  try {
    // Opens file and reads only 1 byte to trigger file-read telemetry
    const fd = fs.openSync(filePath, "r");
    const buffer = Buffer.alloc(1);
    fs.readSync(fd, buffer, 0, 1, 0);
    fs.closeSync(fd);

    console.log(`[SIM] Accessed credential-like file: ${filePath}`);
  } catch (err) {
    console.log(`[SIM] Could not access: ${filePath}`);
  }
}
