//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract NftOption is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    //Id of the next NFT to mint
    Counters.Counter private _nftIdCounter;

    struct NftOption {
        uint256 tokenId;
        address owner;
        string collection;
        string urlNftOption;
        string urlNftImage;
        uint256 strikePrice;
        uint256 amount;
        uint256 expirationDate;
        address purcharser;
    }

    mapping(uint256 => NftOption) private _options;

    constructor() ERC721("One7oken Option", "ONE7OKEN") {
        _nftIdCounter.increment();

        createNftOption(
            NftOption(
                0,
                msg.sender,
                "toto",
                "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
                "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
                50,
                1,
                block.timestamp + 30 days,
                address(0)
            )
        );

        createNftOption(
            NftOption(
                0,
                msg.sender,
                "toto",
                "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
                "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
                50,
                1,
                block.timestamp + 30 days,
                address(0)
            )
        );

        createNftOption(
            NftOption(
                0,
                msg.sender,
                "toto",
                "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
                "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
                50,
                1,
                block.timestamp + 30 days,
                0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
            )
        );

        createNftOption(
            NftOption(
                0,
                msg.sender,
                "toto",
                "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
                "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
                50,
                1,
                block.timestamp + 30 days,
                0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
            )
        );

        createNftOption(
            NftOption(
                0,
                msg.sender,
                "toto",
                "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
                "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
                50,
                1,
                block.timestamp + 30 days,
                0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
            )
        );

        createNftOption(
            NftOption(
                0,
                msg.sender,
                "toto",
                "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
                "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
                50,
                1,
                block.timestamp + 30 days,
                0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
            )
        );

        createNftOption(
            NftOption(
                0,
                msg.sender,
                "toto",
                "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
                "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
                50,
                1,
                block.timestamp + 30 days,
                0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
            )
        );

        executeNftOption(4);
    }

    //toto external
    function createNftOption(NftOption memory _option) public payable {
        _option.tokenId = _nftIdCounter.current();
        _option.owner = msg.sender;
        _options[_nftIdCounter.current()] = _option;
        _safeMint(msg.sender, _nftIdCounter.current());
        _nftIdCounter.increment();
    }

    function getNftOptions() external view returns (NftOption[] memory) {
        NftOption[] memory options = new NftOption[](totalSupply());
        uint256 arrayIndex = 0;
        for (uint256 index = 0; index < _nftIdCounter.current(); index++) {
            if (_options[index].tokenId > 0) {
                options[arrayIndex] = _options[index];
                arrayIndex++;
            }
        }

        return options;
    }

    function purchaseNftOption(uint256 _tokenId) external {
        require(
            ownerOf(_tokenId) != msg.sender,
            "You cannot purchase this option, you are the owner."
        );
        require(
            _options[_tokenId].purcharser == address(0),
            "You cannot purchase a option already purchased."
        );
        _options[_tokenId].purcharser = msg.sender;
    }

    //toto external
    function executeNftOption(uint256 _tokenId) public payable {
        require(
            ownerOf(_tokenId) == msg.sender,
            "You cannot execute this option, you are not the owner."
        );
        require(
            _options[_tokenId].purcharser != address(0),
            "You cannot execute this option, no purchaser."
        );
        _transfer(msg.sender, _options[_tokenId].purcharser, _tokenId);
        // payable(msg.sender).transfer(_options[_tokenId].strikePrice);
        _burn(_tokenId);
        delete _options[_tokenId];
    }
}
