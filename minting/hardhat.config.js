/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");

const { API_URL, METAMASK_PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "ropsten",
   networks: {
      
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${METAMASK_PRIVATE_KEY}`],
   
      }
   },

   etherscan: {
      apiKey:"4Y69I5PXAS6U56SI9IJ7NWWXSSUYMCS59M"
   }
};
