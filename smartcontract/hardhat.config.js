require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const API_URL = process.env.API_URL || "";
const API_KEY = process.env.API_KEY || "";
const URI = "https://ipfs.io/ipfs/QmZ857ZaywSMfNd3X7TypMiPaKPHCU5mXu9uRD2EHLQtBX";
   

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require('@nomiclabs/hardhat-ethers');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
//module.exports = {
//  solidity: "0.7.3",
//};
module.exports = {
  // defaultNetwork: "matic",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    ropsten: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [`0x${PRIVATE_KEY}`]
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: "DVJP9WRY8ETC6J8XTAZV3YKWHF8KRK53GT"
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
}
