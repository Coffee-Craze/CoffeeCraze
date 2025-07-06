const { ethers, upgrades } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // Deploy KofiCoin (UUPS)
  const KofiCoin = await ethers.getContractFactory('KofiCoin');
  const kofiCoin = await upgrades.deployProxy(KofiCoin, [deployer.address], { initializer: 'initialize' });
  await kofiCoin.deployed();
  console.log('KofiCoin deployed to:', kofiCoin.address);

  // Deploy LearningModuleNFT
  const LearningModuleNFT = await ethers.getContractFactory('LearningModuleNFT');
  const nft = await LearningModuleNFT.deploy();
  await nft.deployed();
  console.log('LearningModuleNFT deployed to:', nft.address);

  // Deploy Marketplace
  const Marketplace = await ethers.getContractFactory('Marketplace');
  const marketplace = await Marketplace.deploy();
  await marketplace.deployed();
  console.log('Marketplace deployed to:', marketplace.address);

  // Deploy DAOContract
  const DAOContract = await ethers.getContractFactory('DAOContract');
  const dao = await DAOContract.deploy();
  await dao.deployed();
  console.log('DAOContract deployed to:', dao.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
