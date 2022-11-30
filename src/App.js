import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  };

  const connectWallet = async () => {
    if (window?.solana) {
      const response = await window.solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      {walletAddress && (
        <div
          style={{
            background: "black",
            color: "white",
            maxWidth: "fit-content",
            display: "flex",
            alignItems: "center",
            borderRadius: "4rem",
            padding: "1rem",
            margin: "1rem",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              width: "1rem",
              height: "1rem",
              borderRadius: "2rem",
              background: "green",
              marginRight: "0.5rem",
            }}
          ></div>
          {walletAddress.substr(0, 5)}...{walletAddress.substr(-5)}
        </div>
      )}
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && (
            <button
              className="cta-button connect-wallet-button"
              onClick={connectWallet}
            >
              Connect to Wallet
            </button>
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
