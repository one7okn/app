require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "./src/artifacts"
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/28cae95d6ac146cc99d929b09eb22d7f",
      accounts: ["0x5a28d975ee2b9f892fdc0de8802417b2841a8b2e1eb576355bc9d5d7a47c2be0"]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/28cae95d6ac146cc99d929b09eb22d7f",
      accounts: ["14117252e729898cdb600807c5dff2c38c1bc771a875e8533c3f7474733522f4"]
    }
  }
};
