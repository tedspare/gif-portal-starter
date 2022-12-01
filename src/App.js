import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
  "https://media.giphy.com/media/Ru9sjtZ09XOEg/giphy.gif",
  "https://media.giphy.com/media/3o8doR2qGIXQDGCVoY/giphy.gif",
  "https://media.giphy.com/media/l0Iy3yLzaEPZK4OCA/giphy.gif",
  "https://media.giphy.com/media/eR8bS1SsJGloeK8T4z/giphy.gif",
];

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      const response = await window.solana.connect({ onlyIfTrusted: true });
      setWalletAddress(response.publicKey.toString());
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  };

  const connectWallet = async () => {
    if (window?.solana) {
      const response = await window.solana.connect();
      setWalletAddress(response.publicKey.toString());
    }
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      setGifList([...gifList, inputValue]);
      setInputValue("");
    } else {
      console.log("Empty input. Try again.");
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...");

      // Call Solana program here.

      // Set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

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
            position: "absolute",
            padding: "1rem",
            top: "1rem",
            right: "1rem",
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
          />
          {walletAddress.substr(0, 5)}...{walletAddress.substr(-5)}
        </div>
      )}
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 Giftr</p>
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
        {walletAddress && (
          <div className="connected-container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendGif();
              }}
            >
              <input
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                placeholder="Enter gif link!"
              />
              <button type="submit" className="cta-button submit-gif-button">
                Submit
              </button>
            </form>
            <div className="gif-grid">
              {gifList.reverse().map((gif) => (
                <div className="gif-item" key={gif}>
                  <img src={gif} alt={gif} />
                </div>
              ))}
            </div>
          </div>
        )}
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
