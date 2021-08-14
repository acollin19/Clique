import App from "next/app";
import Cookies from "universal-cookie"
import consts from "consts"
import 'tailwindcss/tailwind.css';
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core"; 
import { Component } from "react";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
      
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  if (appContext?.ctx?.req) {
    const cookies = new Cookies(appContext.ctx.req.headers.cookie);
    const password = cookies.get(consts.SiteReadCookie) ?? "";

    if (password === "Test123") {
      appProps.pageProps.hasReadPermission = true;
    }
  }

  return { ...appProps };
}

export default MyApp;

