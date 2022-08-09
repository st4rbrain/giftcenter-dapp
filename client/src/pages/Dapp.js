import { useEffect, useState } from "react";
import "./Dapp.css";
import GiftsTables from "../components/DappTables/DappTables";
import {ethers} from 'ethers';
import Axios from "axios";
import moment from 'moment';

const GiftCenterABI = [
  "function sendGift(address _recipient, string memory _message) public payable",
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
  const [accountBalance, setAccountBalance] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [sentAmount, setSentAmount] = useState(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);
  const [sentData, setSentData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [sentThisWeek, setSentThisWeek] = useState(0);
  const [receivedThisWeek, setReceivedThisWeek] = useState(0);
  const [withdrawBtnVisible, setWithdrawBtnVisible] = useState(false);

  // checking if valid local storage vars
  useEffect(() => {
    const acc = window.localStorage.getItem('CURRENTLY_CONNECTED_WALLET');
    const conn= window.localStorage.getItem('IS_WALLET_CONNECTED');

    if(conn === null || acc === null) {
      window.localStorage.removeItem('IS_WALLET_CONNECTED');
      window.localStorage.removeItem('CURRENTLY_CONNECTED_WALLET');
    } else {
      try {
        if(JSON.parse(conn) === false && acc !== null) {
        window.localStorage.removeItem('IS_WALLET_CONNECTED');
        window.localStorage.removeItem('CURRENTLY_CONNECTED_WALLET');
        } else {
        if (ethers.utils.isAddress(JSON.parse(acc))){
          setAccount(JSON.parse(acc)); 
          setWalletConnected(JSON.parse(conn));
        } else {
          window.localStorage.removeItem('IS_WALLET_CONNECTED');
          window.localStorage.removeItem('CURRENTLY_CONNECTED_WALLET');
        }
        }
      } catch (err) {
          window.localStorage.removeItem('IS_WALLET_CONNECTED');
          window.localStorage.removeItem('CURRENTLY_CONNECTED_WALLET');
      }
  }

  }, []);


  useEffect(() => {

    // contract.on("currentAccount", (address) => {
    //   console.log(address);
    //   const fetchAccountDetails = async() => {
    //     await Axios.post('http://localhost:3001/gifts/accountInfo', {
    //       sender: address,
    //       recipient: address
    //     }).then((res) => {
    //       console.log(res.data);

    //       setSentData(res.data[0]);
    //       setReceivedData(res.data[1]);
    //       let totalAmountSent = 0;
    //       let totalAmountReceived = 0;
    //       let totalAmountToWithdraw = 0;

    //       res.data[0].forEach(element => {
    //         totalAmountSent += element.amount;
    //       });
    //       res.data[1].forEach(element => {
    //         if(element.withdrawn === false) {
    //           totalAmountToWithdraw += element.amount;
    //         }
    //         totalAmountReceived += element.amount;
    //       });

    //       setLoading(false);
    //       setReceivedAmount(totalAmountReceived);
    //       setSentAmount(totalAmountSent);
    //       setAmountToWithdraw(totalAmountToWithdraw);
    //     })
    //   }
    //   console.log("Fetching Amounts");
    //   fetchAccountDetails();
    // });

    contract.on("withDrawal", (from, amt) => {
      console.log(`${amt} withdrawn successfully to the account ${from}`);
      Axios.post("http://localhost:3001/gifts/withdrawn", {
        recipient: from
      }).then((res) => {
        console.log(res);
        window.location.reload(true);
      })
    })
    return () => {
      // contract.removeAllListeners("currentAccount");
      contract.removeAllListeners("withDrawal");
    }
  }, [])


  useEffect(() => {
    const fetchAccountDetails = async (address) => {
        await Axios.get('http://localhost:3001/gifts/accountInfo/'+address).then((res) => {
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

          setTimeout(() => {
            setLoading(false);
            if (totalAmountToWithdraw > 0) setWithdrawBtnVisible(true);
          }, 500);
          
          setReceivedAmount(totalAmountReceived);
          setSentAmount(totalAmountSent);
          setAmountToWithdraw(totalAmountToWithdraw);

      })
    }

    if (account !== "Connect Wallet") {
        setLoading(true);
        fetchAccountDetails(ethers.utils.getAddress(account));
    }
  
  }, [account])

  useEffect(() => {
    const getBalance = async () => {
      const accBalanace = Number(ethers.utils.formatEther((await provider.getBalance(account))._hex)).toFixed(2);
      setAccountBalance(accBalanace);
    }

    if (account !== "Connect Wallet")
      getBalance(account)
  })


  useEffect(() => {
    const todayDate = new Date();
    const sevenDaysBefore = moment(todayDate).subtract(7, 'days');
    let thisWeekSent = 0;
    let thisWeekReceived = 0;
    for (let i = 0; i < sentData.length; i++) {
      if (moment(sentData[i].createdAt).isBetween(sevenDaysBefore, todayDate)){
        thisWeekSent += 1;
      }
    }
    for (let i = 0; i < receivedData.length; i++) {
      if (moment(receivedData[i].createdAt).isBetween(sevenDaysBefore, todayDate)){
        thisWeekReceived += 1;
      }
    }
    setSentThisWeek(thisWeekSent);
    setReceivedThisWeek(thisWeekReceived);

  }, [sentData, receivedData])



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


  const connectToWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      const check_add = ethers.utils.getAddress(account);

      setAccount(account);
      console.log("Connected to account", check_add);

      setWalletConnected(true);
      // contract.setAccount(account);
      setLoading(true);

      window.localStorage.setItem('IS_WALLET_CONNECTED', JSON.stringify(true));
      window.localStorage.setItem('CURRENTLY_CONNECTED_WALLET', JSON.stringify(account));
      
    } catch(error) {
      console.log(error);
    }
  }

  const connect = () => {
    if(!walletConnected) {
      if (window.ethereum) {
        connectToWallet();
      } else {
          alert("Install Metamask Extension");
      }
    }
  }

  const disconnect = async () => {
    setWalletConnected(false);
    setAccount("Connect Wallet");

    window.localStorage.removeItem('IS_WALLET_CONNECTED');
    window.localStorage.removeItem('CURRENTLY_CONNECTED_WALLET');
  }

  const formatAmount = (amt) => {
    return amt.toFixed(2);
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
                        {walletConnected ? withdrawBtnVisible ?
                          <div><button className="connectbtn" onClick={withdraw}>Withdraw</button></div>: null : null
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
                                <div className="datalabel">Account Balance: </div>
                                <div className="datavalue">{accountBalance}</div>
                              </div>
                              <div className="dataline">
                                <div className="datalabel">Amount to Withdraw: </div>
                                <div className="datavalue">{formatAmount(amountToWithdraw)}</div>
                              </div>
                            </div>}
                        </div>
                        <div className="box">
                            <div className="boxtitle">Sent Gifts Data</div>
                            { loading ? <div className="loading">Loading...</div> :
                            <div>
                              <div className="dataline">
                                <div className="datalabel">This Week: </div>
                                <div className="datavalue">{sentThisWeek}</div>
                              </div>
                              <div className="dataline">
                                <div className="datalabel">All Time: </div>
                                <div className="datavalue">{sentData.length}</div>
                              </div>
                              <div className="dataline">
                                <div className="datalabel">Total Sent Amount: </div>
                                <div className="datavalue">{formatAmount(sentAmount)}</div>
                              </div>
                            </div>
                            }
                        </div>
                        <div className="box">
                            <div className="boxtitle">Received Gifts Data</div>
                            { loading ? <div className="loading">Loading...</div> :
                            <div>
                              <div className="dataline">
                                <div className="datalabel">This Week: </div>
                                <div className="datavalue">{receivedThisWeek}</div>
                              </div>
                              <div className="dataline">
                                <div className="datalabel">All Time: </div>
                                <div className="datavalue">{receivedData.length}</div>
                              </div>
                              <div className="dataline">
                                <div className="datalabel">Total Received Amount: </div>
                                <div className="datavalue">{formatAmount(receivedAmount)}</div>
                              </div>
                            </div>
                            }
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
                        <div className="data">No balances ...</div>
                    </div>
                    <div className="box">
                        <div className="boxtitle">Sent Gifts Data</div>
                        <div className="data">...</div>
                    </div>
                    <div className="box">
                        <div className="boxtitle">Received Gifts Data</div>
                        <div className="data">...</div>
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