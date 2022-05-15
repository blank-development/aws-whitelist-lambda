const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { leaves_1, leaves_2 } = require("./leaves.js");

exports.handler = async (event) => {
  const address = event.queryStringParameters.address;
  const phase = event.queryStringParameters.phase;

  const leaf = keccak256(address);

  let proof;

  switch (phase) {
    case "0":
      const tree_1 = new MerkleTree(leaves_1, keccak256, { sortPairs: true });
      proof = tree_1.getHexProof(leaf);
      break;
    case "1":
      const tree_2 = new MerkleTree(leaves_2, keccak256, { sortPairs: true });
      const proof_temp = tree_2.getHexProof(leaf);
      if (proof_temp.length !== 0) {
        proof = proof_temp;
      } else {
        const tree_1 = new MerkleTree(leaves_1, keccak256, { sortPairs: true });
        proof = tree_1.getHexProof(leaf);
      }
      break;
    default:
      proof = [];
  }

  return proof;
};
