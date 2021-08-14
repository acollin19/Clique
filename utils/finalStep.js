import { uploadIPFS, addImage } from "./firebaseUpload";
import mintNFT from "./minting/scripts/mint-nfts";

const ipfs_link = await uploadIPFS;
return mintNFT(ipfs_link);