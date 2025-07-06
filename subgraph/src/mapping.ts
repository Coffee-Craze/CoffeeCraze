import { Transfer, Mint, NFTMint, Product, Proposal } from "../generated/schema"
import { BigInt } from '@graphprotocol/graph-ts'
import { Transfer as TransferEvent, Mint as MintEvent } from "../generated/KofiCoin/KofiCoin"
// import { Mint as NFTMintEvent } from "../generated/LearningModuleNFT/LearningModuleNFT"
// import { ProductListed } from "../generated/Marketplace/Marketplace"
// import { ProposalCreated, VoteCast } from "../generated/DAOContract/DAOContract"

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}

export function handleMint(event: MintEvent): void {
  let entity = new Mint(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.to = event.params.to
  entity.value = event.params.amount
  entity.save()
}


// LearningModuleNFT: NFTMinted(address to, uint256 tokenId, string uri)
// @ts-ignore
import { NFTMinted as NFTMintedEvent } from "../generated/LearningModuleNFT/LearningModuleNFT"
export function handleNFTMinted(event: NFTMintedEvent): void {
  let entity = new NFTMint(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.uri = event.params.uri
  entity.save()
}

// Marketplace: OwnershipTransferred(address previousOwner, address newOwner)
// @ts-ignore
import { OwnershipTransferred as MarketplaceOwnershipTransferred } from "../generated/Marketplace/Marketplace"
export function handleMarketplaceOwnershipTransferred(event: MarketplaceOwnershipTransferred): void {
  let entity = new Product(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.name = "OwnershipTransferred"
  entity.price = BigInt.fromI32(0)
  entity.owner = event.params.newOwner
  entity.save()
}

// DAOContract: OwnershipTransferred(address previousOwner, address newOwner)
// @ts-ignore
import { OwnershipTransferred as DAOOwnershipTransferred } from "../generated/DAOContract/DAOContract"
export function handleDAOOwnershipTransferred(event: DAOOwnershipTransferred): void {
  let entity = new Proposal(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.title = "OwnershipTransferred"
  entity.votes = BigInt.fromI32(0)
  entity.save()
}
