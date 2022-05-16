const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { leaves_1, leaves_2 } = require("./leaves.js");

exports.handler = async (event) => {
  const address = event.queryStringParameters.address;
  const phase = event.queryStringParameters.phase;

  const leaf = keccak256(address);

  let proof;

  switch (phase) {
    // First whitelist phase
    case "0":
      const tree_1 = new MerkleTree(leaves_1, keccak256, { sortPairs: true });
      // Return a proof from first whitelist Merkle tree
      proof = tree_1.getHexProof(leaf);
      break;
    // Second whitelist phase
    case "1":
      const tree_2 = new MerkleTree(leaves_2, keccak256, { sortPairs: true });
      // Get a proof from second whitelist Merkle tree
      const proof_temp = tree_2.getHexProof(leaf);
      // If that proof exists
      if (proof_temp.length !== 0) {
        // Return a proof from second whitelist Merkle tree
        proof = proof_temp;
      }
      // Otherwise check first whitelist Merkle tree
      else {
        const tree_1 = new MerkleTree(leaves_1, keccak256, { sortPairs: true });
        // Return a proof from first whitelist Merkle tree
        proof = tree_1.getHexProof(leaf);
      }
      break;
    // Public mint phase
    default:
      proof = [];
  }

  return proof;
};
