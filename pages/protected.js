import Head from "next/head"
import Link from "next/link"
import styles from '../styles/protected.module.css'
import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Account from "../components/Account";
import useEagerConnect from "../hooks/useEagerConnect";
import usePersonalSign, { hexlify } from "../hooks/usePersonalSign";
import Image from "next/image";
import { useRouter } from "next/router"
import CreatorHome from "./Creator/creatorhome"
import { useState } from 'react';
import { addImage, uploadIPFS } from "../utils/firebaseUpload";
import {ethers} from "ethers";
import mintNFT from "../minting/scripts/mint-nfts";
import CliqueMint from "../minting/artifacts/contracts/smartcontract.sol/CliqueMint.json";
import { BigNumber } from "bignumber.js";

export default function Protected({ hasReadPermission }) {

//Saving Images
const [ selectedFile, setSelectedFile ] = useState(null);
const [ ipfsUrl, setIpfsUrl ] = useState(null);

//Metamask
const { account, library } = useWeb3React();

const triedToEagerConnect = useEagerConnect();

const sign = usePersonalSign();

const isConnected = typeof account === "string" && !!library;

//Protected Page
const router = useRouter()
if (!hasReadPermission) {
  
  return <CreatorHome redirectPath={router.asPath}/>
}

//Upload 
const handleSubmit = async(e) => {
    console.log("test works");
    e.preventDefault();
    const url = await addImage(selectedFile);
    const ipfs = await uploadIPFS(url);
    setIpfsUrl(ipfs)

    console.log("ipfs link", ipfs);

}    
const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
}

const message = () => {
    if (handleSubmit != null) {
        alert ("Upload Successful");
    } else {
        alert ("Upload unsuccesful, try again");
    }
}

//Minting 
const buy = async() => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  
  const abiAddress = CliqueMint.abi;
  const contractAddress = "0xA028dAB372d58db3F50cE52957d80ef704143c1d";
  const contract = new ethers.Contract(contractAddress, abiAddress, signer);

  const myAddress = await signer.getAddress();
  console.log("tokenuri!!", contract.tokenURI);
  //
  let tokenId = null;

  try {

    tokenId = BigNumber.from(await contract.safeMint(myAddress, ipfsUrl, 
      { gasLimit: ethers.utils.hexlify(250000), 
        gasPrice: ethers.utils.parseUnits('5', "gwei") 
      },));
      console.log(tokenId);

  } catch (error){
    console.log(error);
  };

  //
  // let info = await contract.tokenURI(tokenId);
  // console.log("this is info", info);
}

return (
  <div>
    <Head>
      <title>Influencer Exclusive</title>
    </Head>

    <header className={styles.header}> 
      <Image className={styles.logo} src="/logo.png" alt="logo" width={120} height={60} style="padding-right: 10px;"></Image>      
      <a>
          <button className={styles.button}>
              <Image src= "/metamask.svg.png" alt="metamask" width={25} height={25}></Image>
              <Account triedToEagerConnect={triedToEagerConnect}/>
          </button>
      </a>
      
          <nav className={styles.nav}>
              <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/Creator/creatorhome">Creator</Link></li>
                  <li><Link href="/feed">Feed</Link></li> 
                  <li><Link href="/learnmore">Learn More</Link></li>
              </ul>
          </nav>
    </header>

    <body className={styles.body}>

      <p className={styles.p}>Click on the "Choose File" button to upload the file you would like to turn into an NFT:<br></br>
        
        <form onSubmit={handleSubmit}>
            <label> Select File to Upload</label><br></br>
            <input className={styles.button2} type="file" onChange={handleFileChange}/>

            <input className={styles.button2} type="text" />
            <input className={styles.button2} type="submit" value="Upload Image" onClick={message}/>
                 
        </form>

          <label> Step 2: Click to Mint your NFT</label><br></br>
          <input type="button" onClick={buy} value="Mint NFT"/>

      </p>

    </body>
    
    <footer className={styles.footer}>
      <Link href = "/">
        <a> Back to home </a> 
      </Link>   
    </footer>
  </div>

)
}
