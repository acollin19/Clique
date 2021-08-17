import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/learnmore.module.css'
import Account from "../components/Account"
import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import useEagerConnect from "../hooks/useEagerConnect";
import usePersonalSign, { hexlify } from "../hooks/usePersonalSign";

export default function LearnMore() {

  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const sign = usePersonalSign();

  const handleSign = async () => {
    const msg = "works";
    const sig = await sign(msg);
    console.log(sig);
    console.log("isValid", verifyMessage(msg, sig) === account);
  };

  const isConnected = typeof account === "string" && !!library;
    return ( 
    <container className={styles.container}>
      <Head>
        <title>Learn More</title>
        <link rel="icon" href="/favicon.ico"/>
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
      <h1 className={styles.h1}> New to NFT's? Here's What You Need to Know!</h1>
        <div classnam={styles.border}>
          <div className={styles.div}> 
              <h2> Where To Start?</h2>
                <a> Welcome to <b>Clique</b>! All you need to do in order to Sign In is connect your <a href="https://metamask.io/"/> <i>Metamask Wallet. Your wallet allows you to buy or create NFTs - depending on whether you are a creator or a collector!</i></a> 
              <h2> Metamask?</h2>
                <a> Metamask is a crypto wallet that allows you to store, buy and sell different types of coins, nfts, etc. on the Ethereum Blockchain. If you dont have Metamask installed, open a chrome brower and download the extension onto your browser. Once installed just press the connect to Metamask button on the top left and you're set to go. Simple as that!.</a> 
              <h2> What is an NFT? </h2> 
                <a>Think of the Mona Lisa - it's a physical asset thats worth a lot of money. The same goes for NFTs, they're digital assets that generally come if the shape of art, music, game items and videos! They can be sold and traded online with cryptocurrency rather than the regular dollar that you might be familiar with. You might be asking why someone would buy a digital item that you cant even hold. Well, like the Mona Lisa, each NFT is unique, wouldnt you want to own an item from your favourite artist (or Influencer!) that nobody else has?  </a>
              <h2> What is Clique?</h2>
                <a> Fanjoy X Opensea. Clique is an easy and simple way to buy merch from your favourite influencers!</a> 
              <h2> How Can NFT's be Used? </h2> 
                <a> The use of NFTs are growing as it becomes more popular. As of right now, they can be used as avatar characters, game items, or simply a piece of art that you want to display.</a>
              <h2> </h2>
          </div>
        </div>
        

      </body>


      <footer className={styles.footer}>
          <Link href = "/signup">
              <a> Back to home </a> 
          </Link>         
      </footer>
    </container>
  )
}