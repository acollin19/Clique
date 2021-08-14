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
              <li><Link href="/Creator/creatorhome">Influencer</Link></li>
              <li><Link href="/feed">Feed</Link></li> 
              <li><Link href="/learnmore">Learn More</Link></li>
            </ul>
          </nav>
      </header>

      <body className={styles.body}>
      <h1 className={styles.h1}> New to NFT's? Here's What You Need to Know!</h1>
        <div className={styles.div}> 
            <h2> Where To Start?</h2>
              <a> All you need to do to <i>Sign In</i> is connect your <a href="https://metamask.io/"> Metamask Wallet.</a> If you dont have Metamask installed, open a chrome brower and download the extension onto your browser. Once installed just press the connect to Metamask button on the top left and you're set to go. Simple as that!</a> 
            <h2> Metamask?</h2>
              <a> Metamask is a crypto wallet that allows you to buy and sell different types of coins, nfts, etc. on the Ethereum Blockchain.</a> 
            <h2> What is an NFT? </h2> 
              <a>text</a>
            <h2> What is Clique?</h2>
              <a> Fanjoy X Opensea. Clique is an easy and simple way to buy merch from your favourite influencers!</a> 
            <h2> What is an NFT? </h2>
              <a> An NFT is a digital asset that represents real-world objects such as art, music, avatars, videos, etc!</a>
            <h2> How Can NFT's be Used? </h2> 
              <a> Insert Text </a>
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