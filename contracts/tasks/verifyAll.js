const { run } = require('hardhat');

async function main() {
  // Replace with actual deployed addresses and constructor args if needed
  const contracts = [
    { name: 'KofiCoin', address: process.env.KOFICOIN_ADDRESS, args: [] },
    { name: 'LearningModuleNFT', address: process.env.NFT_ADDRESS, args: [] },
    { name: 'Marketplace', address: process.env.MARKETPLACE_ADDRESS, args: [] },
    { name: 'DAOContract', address: process.env.DAO_ADDRESS, args: [] },
  ];
  for (const c of contracts) {
    if (!c.address) continue;
    try {
      await run('verify:verify', {
        address: c.address,
        constructorArguments: c.args,
      });
      console.log(`${c.name} verified at ${c.address}`);
    } catch (e) {
      console.error(`Verification failed for ${c.name}:`, e.message);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
