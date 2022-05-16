const keccak256 = require("keccak256");
const fs = require("fs");
const { join } = require("path");
const {
  whitelistedAddresses_1,
  whitelistedAddresses_2,
} = require("./whitelistAddresses");

const leaves_1 = whitelistedAddresses_1.map((addr) =>
  keccak256(addr).toString("hex")
);

fs.writeFile(
  join(__dirname, "leaves_1.txt"),
  JSON.stringify(leaves_1, null, "\t"),
  (err) => {
    if (err) console.log(err);
    else {
      console.log("First whitelist leaves generated successfully!");
    }
  }
);

const leaves_2 = whitelistedAddresses_2.map((addr) =>
  keccak256(addr).toString("hex")
);

fs.writeFile(
  join(__dirname, "leaves_2.txt"),
  JSON.stringify(leaves_2, null, "\t"),
  (err) => {
    if (err) console.log(err);
    else {
      console.log("Second whitelist leaves generated successfully!");
    }
  }
);
