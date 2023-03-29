import React, { useState, useEffect } from "react";
import logo from "../logo.png";
import Web3 from "web3";
import "./App.css";
import marketPlace from "../abis/Marketplace.json";
import { InputForm } from "./iputForm";
import { Box, Paper, TextField, Button, Alert } from "@mui/material";

const App = () => {
  const [accAddress, setAccAddress] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketplace, setMarketplace] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productCount, setProductCount] = useState(0);
  useEffect(() => {
    loadWeb3();
  }, []);

  const createProduct = async () => {
    const responce = await marketplace.methods
      .createProduct(name, price)
      .send({ from: accAddress });
    console.log(responce);
    Alert("Product created");
  };

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

    const networkId = await web3.eth.net.getId();
    console.log("network id is", networkId);

    const networkData = marketPlace.networks[networkId];
    if (networkData) {
      const marketplace = web3.eth.Contract(
        marketPlace.abi,
        networkData.address
      );
      setMarketplace(marketplace);
      const product = await marketplace.methods.totalProducts().call();
      console.log("product is", product.toString());
      setProductCount(parseInt(product.toString()));
      loadProducts(marketplace, parseInt(product.toString()));
      alert(
        "Contract connect hu giya chaal ab season dhk la baki subha kr lai"
      );
    } else {
      alert("No contract found on this network");
    }
  };

  const loadProducts = async (market, total) => {
    console.log("marketplace is", market);
    console.log("product count is", total);
    var pro = [];
    for (var i = 1; i <= total; i++) {
      const product = await market.methods.products(i).call();
      console.log("product is", product);
      pro.push(product);
    }
    console.log("products are", pro);
    setProducts(pro);
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
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: 700,
          margin: "auto",
        }}
      >
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 500,
            margin: "auto",
          }}
        >
          <h1>Input Form</h1>
          <div
            style={{
              height: 20,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Enter name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div
            style={{
              height: 20,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Enter price"
            value={price}
            variant="outlined"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />

          <div
            style={{
              height: 20,
            }}
          />
          <Button variant="contained" onClick={createProduct}>
            Submit
          </Button>
        </Paper>
        <InputForm products={products} />
      </Box>
    </div>
  );
};

export default App;
