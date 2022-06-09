//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Option is ERC721Enumerable, Ownable {
    uint nextId = 0;

    struct NftOption {
        uint tokenId;
        string collection;
        string urlNftOption;
        string urlNftImage;
        uint strikePrice;
        uint amount;
        uint256 expirationDate;
    }

    mapping(uint => NftOption) private _options;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 90 days));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days));
    }

    function createNftOption(NftOption memory _option) public payable {
        _option.tokenId = nextId;
        _options[nextId] = _option;
        _safeMint(msg.sender, nextId);
        nextId++;
    }

    function getNftOptions() public view returns(NftOption[] memory) {
        NftOption[] memory options = new NftOption[](nextId);
        for (uint index = 0; index < nextId; index++) {
            options[index] = _options[index];
        }

        return options;      
    }
}
