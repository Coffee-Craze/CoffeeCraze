// Example deploy script
const { ethers, upgrades } = require('hardhat');
require('dotenv').config();

async function main() {
  // Deploy contracts here
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
