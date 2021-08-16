import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Account from "../components/Account";
import useEagerConnect from "../hooks/useEagerConnect";
import usePersonalSign from "../hooks/usePersonalSign";
import React from "react";
import ImageSlider from "../components/ImageSlider";
import { SliderData } from '../components/SliderData';


export default function Home() {
  // Metamask
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
        <title>Clique</title>
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
        
      </header>

      <body className={styles.body}>  
        <ImageSlider slides={SliderData}/>

        <nav className={styles.nav}>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/Creator/creatorhome">Creator</Link></li>
              <li><Link href="/feed">Feed</Link></li> 
              <li><Link href="/learnmore">Learn More</Link></li>
            </ul>
          </nav>

      </body>
      <footer className={styles.footer}>
        <a>Clique</a>
      </footer>
    </container>
  )
}
