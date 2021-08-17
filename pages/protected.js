import Head from "next/head"
import Link from "next/link"
import styles from '../styles/protected.module.css'
import { useWeb3React } from "@web3-react/core";
import Account from "../components/Account";
import useEagerConnect from "../hooks/useEagerConnect";
import usePersonalSign, { hexlify } from "../hooks/usePersonalSign";
import Image from "next/image";
import { useRouter } from "next/router"
import CreatorHome from "./Creator/creatorhome"
import { useState } from 'react';
import { addImage, uploadIPFS, dataFile } from "../utils/firebaseUpload";
import {ethers} from "ethers";
import CliqueMint from "../minting/artifacts/contracts/smartcontract.sol/CliqueMint.json";
import { BigNumber } from "bignumber.js";


export default function Protected({ hasReadPermission }) {

//Saving Images
const [ selectedFile, setSelectedFile ] = useState(null);
const [ ipfsUrl, setIpfsUrl ] = useState(null);

let [Name, setName] = useState("");
let [Description, setDescription] = useState("");

//Metamask
const { account, library } = useWeb3React();

const triedToEagerConnect = useEagerConnect();

const sign = usePersonalSign();

const isConnected = typeof account === "string" && !!library;


//Protected Pages
const router = useRouter()
if (!hasReadPermission) {
  
  return <CreatorHome redirectPath={router.asPath}/>
}

//Upload 
const handleSubmit = async(e) => {
    e.preventDefault();
    const url = await addImage(selectedFile);
    const ipfs = await uploadIPFS(url, Name, Description);
    setIpfsUrl(ipfs)


    console.log("metadata link", ipfs);
    console.log("picture link", url);
    
    //nftList(url, nftToken);

    dataFile(url);
    console.log("list of urls", dataFile(url));


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

const nftToken = ["url1"];

const nftList = async(nftURL, nftArray) => {
  const x = nftArray.push(nftURL)

  console.log("hi", x.value);

}

//Minting 
const buy = async() => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  
  const abiAddress = CliqueMint.abi;
  const contractAddress = "0x0EACdb407b6fACcc9771e867CEaEA6dd2DDdF457";
  const contract = new ethers.Contract(contractAddress, abiAddress, signer);

  const myAddress = await signer.getAddress();
  console.log("tokenuri!!", contract.tokenURI);
  //
  let tokenId = null;

  try {
    //tokenId = BigNumber.from(
    await contract.safeMint(myAddress, ipfsUrl, 
      { gasLimit: ethers.utils.hexlify(250000), 
        gasPrice: ethers.utils.parseUnits('5', "gwei") 
      },);
    // pushing selected file input into the array
    //nftList(handleSubmit.url, nftToken);
    
      //console.log("this is tokenID", tokenId);

  } catch (error){
    console.log(error);
  };


  // let info = await contract.tokenURI(tokenId);
  // console.log("this is info", tokenId);
}

return (
  <container className={styles.container}>
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

      <p className={styles.p}>Welcome to the NFT minting page. Click on the "Choose File" button to upload the file you would like to turn into an NFT:<br></br><br></br>
        
        <form onSubmit={handleSubmit}>
            <label> <b>Step 1:</b> Select File to Upload</label><br></br>
            <input className={styles.button2} type="file" onChange={handleFileChange}/><br></br><br></br>
            <label for="Name">Name:</label>
            <input type="text" id="Name" value={Name} onChange={e => setName(e.target.value)}/><br></br><br></br>
            <label for="Description">Image Description:</label>
            <input type="text" id="Description" value={Description} onChange={e => setDescription(e.target.value)}/><br></br>
            <input className={styles.button2} type="submit" value="Upload Image" onClick={message}/>
            
                 
        </form><br></br>

          <label> <b>Step 2:</b> Click to Mint your NFT</label><br></br>
          <input className={styles.button2} type="button" onClick={buy} value="Mint NFT"/>


      </p>

    </body>
    
    <footer className={styles.footer}>
      <Link href = "/">
        <a> Back to home </a> 
      </Link>   
    </footer>

  </container>

)
}
