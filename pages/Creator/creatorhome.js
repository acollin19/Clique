import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/influencer.module.css'
import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Account from "../../components/Account";
import useEagerConnect from "../../hooks/useEagerConnect";
import usePersonalSign, { hexlify } from "../../hooks/usePersonalSign";
import Cookies from "universal-cookie";
import consts from "consts";
import { useState } from "react";


const Login = ({ redirectPath }) => {
    const [password, setPassword] = useState("")

    return (   
    <div className="w-1/3 max-w-sm mx-auto">
        <form>
            <label className="block">
            
            <input
                type="text"
                className="form-input mt-1 block w-full bg-gray-50"
                placeholder="Your site password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            </label>
            <button
            type="submit"
            className="mt-3 bg-pink-300 text-white p-2 font-bold rounded hover:bg-pink-400"
            onClick={(e) => {
                e.preventDefault()
                const cookies = new Cookies()
                cookies.set(consts.SiteReadCookie, password, {
                path: "/",
                })
                window.location.href = redirectPath ?? "/"
            }}
            >
            Login
            </button>
        </form>
    </div>
    )
}


export default function CreatorHomePage(hasReadPermission) {
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
        <title>Creator</title>
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

            <h1> You chose to sign up as an <i>Influencer </i> </h1>
            <p>
                To continue as an Influencer, we will need to confirm your identity. <br></br>
                Please DM us on instagram <a href="https://www.instagram.com/blockblock.clique/">@blockblock.clique</a> so that we can confirm your status.
                <br></br>Once confirmed, click the button that will appear below to mint your NFT as Merch!
            </p> 
            
            <br></br>

            <Login redirectPath="/protected"/>
        
        </body>


        <footer className={styles.footer}>
            <Link href = "/signup" >
                <a> Back </a> 
            </Link> 
        </footer> 
    </container> 
    )
}

