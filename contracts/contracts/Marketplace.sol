// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is Ownable {
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address owner;
        bool sold;
    }

    struct Vendor {
        bool registered;
        uint256[] productIds;
    }

    mapping(address => Vendor) public vendors;
    mapping(uint256 => Product) public products;
    uint256 public nextProductId;

    event VendorRegistered(address indexed vendor);
    event ProductListed(uint256 indexed id, string name, uint256 price, address indexed owner);
    event ProductPurchased(uint256 indexed id, address indexed buyer, uint256 price);

    modifier onlyVendor() {
        require(vendors[msg.sender].registered, "Not a registered vendor");
        _;
    }

    constructor() Ownable(msg.sender) {}

    function registerVendor() external {
        require(!vendors[msg.sender].registered, "Already registered");
        vendors[msg.sender].registered = true;
        emit VendorRegistered(msg.sender);
    }

    function listProduct(string memory name, uint256 price) external onlyVendor {
        require(price > 0, "Price must be positive");
        uint256 id = nextProductId++;
        products[id] = Product(id, name, price, msg.sender, false);
        vendors[msg.sender].productIds.push(id);
        emit ProductListed(id, name, price, msg.sender);
    }

    function buyProduct(uint256 productId) external payable {
        Product storage p = products[productId];
        require(!p.sold, "Already sold");
        require(msg.value >= p.price, "Insufficient payment");
        p.sold = true;
        payable(p.owner).transfer(p.price);
        emit ProductPurchased(productId, msg.sender, p.price);
    }

    function getVendorProducts(address vendor) external view returns (uint256[] memory) {
        return vendors[vendor].productIds;
    }
}
