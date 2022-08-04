import { useState, useEffect } from "react";
import "./Dapp.css";
import GiftsTables from "../components/DappTables/DappTables";


const ethers = require('ethers');

// const GiftCenterABI = [
//   "function sendGift(address _recipient, string memory _message) public payable",
//   "event Gifted(address from, address to, string message, uint amount, uint time)"
// ];


function Dapp() {
    
  const [provider, setProvider] = useState();
//   const [contractAddress, setContractAddress] = useState();
  const [account, setAccount] = useState("Connect Wallet");

  useEffect(() => {
    const loadProvider = () => {
      const url = "https://small-bold-dream.matic-testnet.discover.quiknode.pro/4e7c4314ce145b2aae49af69f438667ba35f897d/";
      const provider = new ethers.providers.JsonRpcProvider(url);
      setProvider(provider);
    }
    if (window.ethereum) {
      loadProvider();
    } else {
      console.log("Install Metamask");
    }
    
  }, []);

//   const changeTimeFormat = async (time) => {
//     const milliseconds = time * 1000;
//     const dateObject = new Date(milliseconds);
//     const humanDateFormat = dateObject.toLocaleString('en-US', {day: 'numeric', month: 'numeric', year: 'numeric'});
//     return humanDateFormat;
//   }

  const getBalance = async (account) => {
    const balanace = await provider.getBalance(account);
    console.log(`Balance of ${account} is ${ethers.utils.formatEther(balanace)} MATIC`);
  }

  const connect = async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const account = accounts[0];
            console.log("Connected to account", account);
            getBalance(account);
            setAccount(account);
    
          } catch(error) {
            console.log(error);
          }
    } else {
        alert("Install Metamask Extension");
    }
  }

    return ( 
        <div>
            <header className="dappheader">
                <div className="dappcontainer">
                    <div className="top">
                        <div className="logo">GiftCenter</div>
                        <div><button className="connectbtn" onClick={connect}>{account}</button></div>
                    </div>
                    <div className="details">
                        <div className="box">
                            <div className="boxtitle">Balance</div>
                            <div className="data">Currently there is no balance in this account</div>
                        </div>
                        <div className="box">
                            <div className="boxtitle">Sent Gifts Data</div>
                            <div className="data">This shows the data of all the gifts that have been sent</div>
                        </div>
                        <div className="box">
                            <div className="boxtitle">Received Gifts Data</div>
                            <div className="data">This shows the data of all the gifts that have been reveived</div>
                        </div>
                    </div>
                </div>
            </header>
            <GiftsTables/>
        </div>
    );
}

export default Dapp;