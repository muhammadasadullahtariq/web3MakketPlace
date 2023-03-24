import React, { useState, useEffect } from "react";
import logo from "../logo.png";
import Web3 from "web3";
import "./App.css";
import marketPlace from "../abis/Marketplace.json";

const App = () => {
  const [accAddress, setAccAddress] = useState("");
  const [networkId, setNetworkId] = useState("");
  useEffect(() => {
    //loadWeb3();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    getConnectedAccAddress();
  };

  const getConnectedAccAddress = async () => {
    const web3 = window.web3;
    const accAddress = await web3.eth.getAccounts();
    setAccAddress(accAddress[0]);

    //get the network id
    const networkId = await web3.eth.net.getId();
    console.log("network id is",networkId);

    const networkData = marketPlace.networks[networkId];
    if (networkData) {
      const marketplace = web3.eth.Contract(
        marketPlace.abi,
        networkData.address
      );
      alert(
        "Contract connect hu giya chaal ab season dhk la baki subha kr lai"
      );
    } else {
      alert("No contract found on this network");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark  bg-dark  p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Witcher
        </a>
        <p
          style={{
            color: "white",
            marginRight: 20,
            paddingTop: 10,
          }}
        >
          {accAddress}
        </p>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo} className="App-logo" alt="logo" />
              </a>
              <h1>Witcher Starter Kit</h1>
              <p>
                Edit <code>src/components/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                LEARN BLOCKCHAIN{" "}
                <u>
                  <b>NOW! </b>
                </u>
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
