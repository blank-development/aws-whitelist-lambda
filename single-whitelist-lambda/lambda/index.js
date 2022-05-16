const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { leaves } = require("./leaves.js");

exports.handler = async (event) => {
  const address = event.queryStringParameters.address;

  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  const leaf = keccak256(address);

  const proof = tree.getHexProof(leaf);

  return proof;
};
