 // When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const IPFS = require('ipfs-core');

const first100Metadata = (id) => {
  return {
    "name": `First 100 Badge #${id}`,
    "description": "Awarded to the first 100 members of the MeebitsDAO.",
    "image": "ipfs://QmT1GVzgZQmDg7kicm9h8cjYpiGtgs8C3mFkkwcbE83Avk",
    "attributes": [
      {
        "trait_type": "Artist",
        "value": "Waxbones"
      },
      {
        "trait_type": "Series",
        "value": "First 100"
      },
      {
        "trait_type": "Series ID",
        "display_type": "number",
        "value": `${id}`
      }
    ]
  }
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const ipfs = await IPFS.create();

  const metadata = first100Metadata(1);
  const jsonMetadata = JSON.stringify(metadata);
  const ipfsRes = await ipfs.add(jsonMetadata);
  const { path } = ipfsRes;
  const URI = "https://ipfs.io/ipfs/QmZ857ZaywSMfNd3X7TypMiPaKPHCU5mXu9uRD2EHLQtBX";

  // We get the contract to deploy
  const NFT = await hre.ethers.getContractFactory("MeebitsDAO_Achievements");
  const WALLET_ADDRESS = "0xdF67e459d82C3e14Bc3Ac9005AD036031Df4c452"
  const CONTRACT_ADDRESS = "0xbDe4fd8147Bab1bFD18FC9f0EfA598C1A3d5cA20"// Rinkby address

  const contract = NFT.attach(CONTRACT_ADDRESS);

  await contract.safeMint(WALLET_ADDRESS, URI);
  console.log("NFT minted for:", WALLET_ADDRESS);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
/* 

 const NFT = await hre.ethers.getContractFactory("AchievementNFT");
 const URI = "https://ipfs.io/ipfs/QmZ857ZaywSMfNd3X7TypMiPaKPHCU5mXu9uRD2EHLQtBX"
 const WALLET_ADDRESS = "0xdF67e459d82C3e14Bc3Ac9005AD036031Df4c452"
 const CONTRACT_ADDRESS = "0xbDe4fd8147Bab1bFD18FC9f0EfA598C1A3d5cA20"

*/
