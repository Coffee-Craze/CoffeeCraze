// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LearningModuleNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(address => bool) public hasMinted;

    constructor() ERC721("Learning Module NFT", "LMNFT") Ownable(msg.sender) {}

    function mint(address to, string memory uri) external onlyOwner {
        require(!hasMinted[to], "Already minted");
        _safeMint(to, nextTokenId);
        _setTokenURI(nextTokenId, uri);
        hasMinted[to] = true;
        nextTokenId++;
    }
}
