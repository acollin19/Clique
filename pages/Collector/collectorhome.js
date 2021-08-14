import Link from 'next/link'
import Head from 'next/head'
import styles from '../../styles/collector.module.css'
import Image from 'next/image'
import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Account from "../../components/Account";
import useEagerConnect from "../../hooks/useEagerConnect";
import usePersonalSign from "../../hooks/usePersonalSign";
import axios from 'axios';


export default function CollectorHomePage() {

    
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
            <title>Collector Page</title>
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

        
            <a>Welcome to the collector page!</a>
        
        
        </body> 
        
        <footer className={styles.footer}>
            <Link href = "/" >
                <a> Homepage </a> 
            </Link> 
        </footer> 
    </container> 
    )
}

