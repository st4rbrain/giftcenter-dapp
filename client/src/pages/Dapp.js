import { useEffect, useState } from "react";
import "./Dapp.css";
import GiftsTables from "../components/DappTables/DappTables";
import {ethers} from 'ethers';
import Axios from "axios";

const GiftCenterABI = [
  "function sendGift(address _recipient, string memory _message) public payable",
  "function setAccount(address _account) external",
  "function withdrawAmount(address _account, uint _amt) external",
  "event withDrawal(address from, uint amount)",
  "event currentAccount(address account)",
]

const giftcenterAddress = '0x44B78BdEE21810B87d78178Ba4DE299526e24127';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(giftcenterAddress, GiftCenterABI, signer);

function Dapp() {
    
  const [account, setAccount] = useState("Connect Wallet");
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [sentAmount, setSentAmount] = useState(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);
  const [sentData, setSentData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);

  // const getBalance = async (account) => {
  //   const balanace = await contract.getBalance(account);
  //   console.log(`Balance of ${account} is ${ethers.utils.formatEther(balanace)} MATIC`);
  // }

  useEffect(() => {
    const acc = window.localStorage.getItem('CURRENTLY_CONNECTED_WALLET');
    const conn= window.localStorage.getItem('IS_WALLET_CONNECTED');
    const sent = window.localStorage.getItem('SENT_AMOUNT');
    const received = window.localStorage.getItem('RECEIVED_AMOUNT');
    const received_data = window.localStorage.getItem('RECEIVED_DATA');
    const sent_data = window.localStorage.getItem('SENT_DATA');
    const withdraw = window.localStorage.getItem('WITHDRAW_AMOUNT');

    if (acc !== null) setAccount(JSON.parse(acc));
    if (conn !== null) setWalletConnected(JSON.parse(conn));
    if (sent !== null) setSentAmount(JSON.parse(sent));
    if (received !== null) setReceivedAmount(JSON.parse(received));
    if (sent_data !== null) setSentData(JSON.parse(sent_data));
    if (received_data !== null) setReceivedData(JSON.parse(received_data));
    if (withdraw !== null) setAmountToWithdraw(JSON.parse(withdraw));
  }, []);

  // useEffect(() => {
  //   if(account !== "Connect Wallet") {
  //     console.log("Setting account:", account);
  //       contract.setAccount(account);
  //   }
      
  // }, [account]);

  useEffect(() => {

    contract.on("currentAccount", (address) => {
      console.log(address);
      const fetchAccountDetails = async() => {
        await Axios.post('http://localhost:3001/gifts/accountInfo', {
          sender: address,
          recipient: address
        }).then((res) => {
          console.log(res.data);

          setSentData(res.data[0]);
          setReceivedData(res.data[1]);
          let totalAmountSent = 0;
          let totalAmountReceived = 0;
          let totalAmountToWithdraw = 0;

          res.data[0].forEach(element => {
            totalAmountSent += element.amount;
          });
          res.data[1].forEach(element => {
            if(element.withdrawn === false) {
              totalAmountToWithdraw += element.amount;
            }
            totalAmountReceived += element.amount;
          });

          setLoading(false);
          setReceivedAmount(totalAmountReceived);
          setSentAmount(totalAmountSent);
          setAmountToWithdraw(totalAmountToWithdraw);

          window.localStorage.setItem('SENT_AMOUNT', JSON.stringify(totalAmountSent));
          window.localStorage.setItem('RECEIVED_AMOUNT', JSON.stringify(totalAmountReceived));
          window.localStorage.setItem('SENT_DATA', JSON.stringify(res.data[0]));
          window.localStorage.setItem('RECEIVED_DATA', JSON.stringify(res.data[1]));
          window.localStorage.setItem('WITHDRAW_AMOUNT', JSON.stringify(totalAmountToWithdraw));
        })
      }
      console.log("Fetching Amounts");
      fetchAccountDetails();
    });

    contract.on("withDrawal", (from, amt) => {
      console.log(`${amt} withdrawn successfully to the account ${from}`);
      Axios.post("http://localhost:3001/gifts/withdrawn", {
        recipient: from
      }).then((res) => {
        console.log(res);
      })
    })
    return () => {
      contract.removeAllListeners("currentAccount");
      contract.removeAllListeners("withDrawal");
    }
  }, [])

  const withdraw = async() => {
    if (amountToWithdraw !== 0) {
      console.log(amountToWithdraw);
      const toWei = ethers.utils.parseUnits(amountToWithdraw.toString(), 18);
      console.log(toWei);
      contract.withdrawAmount(account, toWei);
    } else {
      console.log("No amounts to withdraw");
    }
  }

  const connect = async () => {
    if(!walletConnected) {
      if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const account = accounts[0];
            // getBalance(account);

            setAccount(account);
            console.log("Connected to account", accounts[0]);

            setWalletConnected(true);
            contract.setAccount(account);
            setLoading(true);

            window.localStorage.setItem('IS_WALLET_CONNECTED', JSON.stringify(true));
            window.localStorage.setItem('CURRENTLY_CONNECTED_WALLET', JSON.stringify(account));
            
          } catch(error) {
            console.log(error);
          }
      } else {
          alert("Install Metamask Extension");
      }
    }
    
  }

  const disconnect = async () => {
    setWalletConnected(false);
    setSentData([]);
    setReceivedData([]);
    setSentAmount(0);
    setReceivedAmount(0);
    setAccount("Connect Wallet");
    setLoading(false);
    window.localStorage.removeItem('IS_WALLET_CONNECTED');
    window.localStorage.removeItem('CURRENTLY_CONNECTED_WALLET');
    window.localStorage.removeItem('SENT_AMOUNT');
    window.localStorage.removeItem("RECEIVED_AMOUNT");
    window.localStorage.removeItem('WITHDRAW_AMOUNT');
    window.localStorage.removeItem('SENT_DATA');
    window.localStorage.removeItem('RECEIVED_DATA');
  }


    return ( 
      <div>
        {walletConnected ?
          <div>
            <header className="dappheader">
                <div className="dappcontainer">
                    <div className="top">
                        <div className="logo">GiftCenter</div>
                        <div className="buttons">
                          {walletConnected ? 
                          <div><button className="connectbtn" onClick={withdraw}>Withdraw</button></div>: null
                          }
                          <div><button className="connectbtn" onClick={connect}>{account}</button></div>
                          <div><button className="connectbtn" onClick={disconnect}>Disconnect</button></div>
                        </div>
                    </div>
                    <div className="details">
                        <div className="box">
                            <div className="boxtitle">Balance</div>
                            {loading ? <div className="loading">Loading...</div> :
                            <div>
                              <div className="dataline">
                                <div className="datalabel">Total Received Amount: </div>
                                <div className="datavalue">{receivedAmount}</div>
                              </div>
                              <div className="dataline">
                                <div className="datalabel">Total Sent Amount: </div>
                                <div className="datavalue">{sentAmount}</div>
                              </div>
                              <div className="dataline">
                                <div className="datalabel">Amount to Withdraw: </div>
                                <div className="datavalue">{amountToWithdraw}</div>
                              </div>
                            </div>}
                        </div>
                        <div className="box">
                            <div className="boxtitle">Sent Gifts Data</div>
                            <div className="data">Total</div>
                        </div>
                        <div className="box">
                            <div className="boxtitle">Received Gifts Data</div>
                            <div className="data">This shows the data of all the gifts that have been reveived</div>
                        </div>
                    </div>
                </div>
            </header>
            <GiftsTables contract={contract} sentData={sentData} receivedData={receivedData} />
        </div>
        : <div>
        <header className="dappheader">
            <div className="dappcontainer">
                <div className="top">
                    <div className="logo">GiftCenter</div>
                    <div className="buttons">
                      <div><button className="connectbtn" onClick={connect}>{account}</button></div>
                      {walletConnected? 
                      <div><button className="connectbtn" onClick={disconnect}>Disconnect</button></div>: null
                      }
                    </div>
                </div>
                <div className="details">
                    <div className="box">
                        <div className="boxtitle">Balance</div>
                        {loading ? <div className="loading">Loading...</div> :
                        <div>
                          <div className="data">No balances</div>
                        </div>}
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
        <div className="plsconnectwallet">
          <div className="info">
            <div className="headinfo">Please, connect your wallet</div>
            <div className="subinfo">Please connect your wallet to see the gifts that you sent, received and the interchanged amounts.</div>
          </div>
          </div>
        </div> 
        }
      </div>
    );
}

export default Dapp;