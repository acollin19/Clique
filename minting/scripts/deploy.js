// //import ethers from "ethers";

// //const ethers = require("hardhat");

// async function main() {
  
//     const [deployer] = await ethers.getSigners();
//     console.log("Deploying contracts with the account:", deployer.address);

//     console.log("Account balance:", (await deployer.getBalance()).toString());
//     const CLIQUE = await ethers.getContractFactory("CliqueMint");

//     // Start deployment, returning a promise that resolves to a contract object
//     const clique = await CLIQUE.deploy(500);
//     console.log("Contract deployed to address:", clique.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch(error => {
//     console.error(error);
//     process.exit(1);
//   });