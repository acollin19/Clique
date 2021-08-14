import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import nftList from '../../components/nfts/nftList'
import styles from '../../styles/feed.module.css'
import React from "react";

export default function feed() {
return ( 
    <container className={styles.container}>
        <Head>
            <title>Feed</title>
        </Head>

        <header className={styles.header}>
            <Image className={styles.logo1} src="/logo.png" alt="logo" width={100} height={60} style="padding-right: 10px;"></Image>     
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
        <h1 className={styles.bold}> LIST OF AVAILABLE NFT&apos;S </h1> 
            <html>
            <div className="row">
                <div className="column">
                    <button className={styles.button}> 
                        <Link href="/feed/david2.png">
                            <Image src="/david2.png" alt="pic1" width={250} height={250}></Image>  
                        </Link>
                    </button>

                    <button className={styles.button}> 
                        <Link href="/feed/emma.png"> 
                        <Image src="/emma.png" alt="pic3" width={250} height={250}></Image>
                        </Link>
                    </button>

                    <button className={styles.button}>
                        <Link href="/feed/zaneheath.png"> 
                            <Image  src="/zaneheath.png" alt="pic2" width={250} height={250}></Image>
                        </Link>
                    </button> 

                    <button className={styles.button}>
                        <Link href="/feed/bryce.png"> 
                            <Image src="/bryce.png" alt="bryce" width={250} height={250}></Image>
                        </Link> 
                    </button>   

                    <button className={styles.button}>
                        <Link href="/feed/zaneheath2.png"> 
                            <Image  src="/zaneheath2.png" alt="Bryce" width={250} height={250}></Image>
                        </Link>
                    </button> 

                    <button className={styles.button}>
                        <Link href="/feed/charlinft2.mp4">
                            <video width="250" height="100" autoPlay loop muted>
                                <source src="/charlinft2.MP4" type="video/mp4"></source>  
                            </video>  
                        </Link>
                    </button>
                    <button className={styles.button}>
                        <Link href="/feed/emma3.png"> 
                            <Image  src="/emma3.png" alt="emmaC" width={250} height={250}></Image>
                        </Link>
                    </button>   
                                     
                    <button className={styles.button}>
                        <Link href="/feed/logannft.mp4">
                            <video width="250" height="250" autoPlay loop muted>
                                <source src="/logannft.MP4" type="video/mp4"></source>  
                            </video>  
                        </Link>
                    </button>  
                    <button className={styles.button}>
                        <Link href="/feed/emma2.png"> 
                            <Image  src="/emma2.png" alt="pic2" width={250} height={250}></Image>
                        </Link>
                    </button>
                    <button className={styles.button}>
                        <Link href="/feed/taylor.mp4">
                            <video width="250" height="250" autoPlay loop muted>
                                <source src="/taylor.MP4" type="video/mp4"></source>  
                            </video>  
                        </Link>
                    </button> 
                    <button className={styles.button}>
                        <Link href="/feed/vinnie.png"> 
                            <Image  src="/vinnie.png" alt="pic2" width={250} height={250}></Image>
                        </Link>
                    </button>  
    
                    <button className={styles.button}>
                        <Link href="/feed/addisonnft.mp4">
                            <video width="250" height="250" autoPlay loop muted>
                                <source src="/addisonnft.MP4" type="video/mp4"></source>  
                            </video>  
                        </Link>
                    </button>
                    <button className={styles.button}>
                        <Link href="/feed/david.png"> 
                            <Image  src="/david.png" alt="pic2" width={250} height={250}></Image>
                        </Link>
                    </button>  
                    <button className={styles.button}>
                        <Link href="/feed/loren.mp4">
                            <video width="250" height="250" autoPlay loop muted>
                                <source src="/loren.MP4" type="video/mp4"></source>  
                            </video>  
                        </Link>
                    </button>

                    
                </div>
            </div>
            </html>
     
        
        </body>
        
    </container>
    )
}

