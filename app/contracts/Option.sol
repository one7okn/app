//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Option is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    //Id of the next NFT to mint
    Counters.Counter private _nftIdCounter;

    struct NftOption {
        uint tokenId;
        string collection;
        string urlNftOption;
        string urlNftImage;
        uint strikePrice;
        uint amount;
        uint256 expirationDate;
        address purcharser;
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
            block.timestamp + 30 days,
            address(0)));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days,
            address(0)));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days,
            msg.sender));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days,
            msg.sender));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days,
            msg.sender));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days,
            msg.sender));

        createNftOption(NftOption(
            0, 
            "toto",
            "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
            "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
            50,
            1,
            block.timestamp + 30 days,
            msg.sender));
    }

//toto external
    function createNftOption(NftOption memory _option) public payable {
        _option.tokenId = _nftIdCounter.current();
        _options[_nftIdCounter.current()] = _option;
        _safeMint(msg.sender, _nftIdCounter.current());
        _nftIdCounter.increment();
    }

    function getNftOptions() external view returns(NftOption[] memory) {
        NftOption[] memory options = new NftOption[](_nftIdCounter.current());
        for (uint index = 0; index < _nftIdCounter.current(); index++) {
            options[index] = _options[index];
        }

        return options;      
    }

    function purchaseNftOption(uint _tokenId) external {
        require(_options[_tokenId].purcharser == address(0), "You cannot purchase a contract alaready purchased.");
        _options[_tokenId].purcharser = msg.sender;
    }

    function executeNftOption(uint _tokenId) external {
        require(ownerOf(_tokenId) == msg.sender, "You cannot execute a option.");
        _options[_tokenId].purcharser = msg.sender;
    }
}
