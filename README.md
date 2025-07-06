# Coffee Craze Monorepo

A full-stack decentralized app for coffee lovers, built as a modular monorepo.

## Folder Structure
- `/frontend`: Next.js (App Router), TypeScript, Wagmi, RainbowKit, Tailwind, Framer Motion
- `/contracts`: Solidity smart contracts using Hardhat or Foundry + OpenZeppelin libraries
- `/subgraph`: Scaffold with The Graph for indexing smart contract events
- `/scripts`: Node.js deployment and verification scripts

## Features
1. **Wallet Connection & Auth**
   - SIWE (Sign-In with Ethereum) integration
   - ENS profile linking
   - EVM wallets only (MetaMask, WalletConnect)
2. **Education Module**
   - Quiz system (multiple choice)
   - NFT minting on quiz completion
   - Badge unlock & coin sparkle animations
3. **Smart Contracts**
   - KofiCoin (ERC-20, mintable, UUPS upgradeable)
   - LearningModuleNFT (ERC-721/1155, soulbound optional, IPFS metadata)
   - Marketplace (vendor registration, escrow, dispute)
   - DAOContract (proposals, staking, treasury)
4. **Marketplace UI**
   - Product listing, vendor registration, payments (Kofi Coin, USDC/DAI)
5. **DAO Voting Interface**
   - Modal transitions, proposal creation/voting
6. **Deployment**
   - Polygon only, hardhat tasks, subgraph indexers
7. **Storage**
   - IPFS for metadata/images, Arweave hooks (optional)

## MVP Notes
- No zk-proofs
- Multilingual support deferred
- Modular upgrade paths for future features
