const keccak256 = require("keccak256");
const fs = require("fs");
const { join } = require("path");
const { whitelistedAddresses } = require("./whitelistAddresses");

const leaves = whitelistedAddresses.map((addr) =>
  keccak256(addr).toString("hex")
);

fs.writeFile(
  join(__dirname, "leaves.txt"),
  JSON.stringify(leaves, null, "\t"),
  (err) => {
    if (err) console.log(err);
    else {
      console.log("Leaves generated successfully!");
    }
  }
);
