import { useEffect, useRef, useState } from "react";
import "./Dapp.css";
import GiftsTables from "../components/DappTables/DappTables";
import { WithdrawNotification, UnsupportedNetworkNotification } from "../components/notification";
import { WithdrawErrorNotification, ComingSoonNetworkNotification } from "../components/notification";
import {ethers} from 'ethers';
import Axios from "axios";
import moment from 'moment';

const contractAddresses = {
  80001: process.env.REACT_APP_POLYGON_MUMBAI_CONTRACT_ADDRESS,
  5: process.env.REACT_APP_GORELI_ETH_CONTRACT_ADDRESS,
  137: process.env.REACT_APP_POLYGON_MUMBAI_CONTRACT_ADDRESS,
  1: process.env.REACT_APP_GORELI_ETH_CONTRACT_ADDRESS
}

const chainSymbols = {
  80001 : "mMATIC",
  1 : "ETH",
  137: "MATIC",
  5: "GoreliETH"
}

const hexChainIds = {
  80001 : "0x13881",
  1 : "0x1",
  137: "0x89",
  5: "0x5"
}


const rpcURLs = {
  1: 'https://mainnet.infura.io/v3/',
  137: 'https://polygon-rpc.com/',
  80001: 'https://matic-mumbai.chainstacklabs.com',
  5: 'https://matic-mumbai.chainstacklabs.com'
}

const chainNames = {
  80001 : "Polygon Mumbai",
  1 : "Ethereum Mainnet",
  137: "Polygon Mainnet",
  5: "Goreli Testnet"
}

const networkLogosClass = {
  80001 : "maticnetworklogo",
  1 : "ethnetworklogo",
  137: "maticnetworklogo",
  5: "ethnetworklogo"
}

const GiftCenterABI = [
  "function sendGift(address _recipient, string memory _message) public payable",
  "function withdrawAmount(address _account, uint _amt) external",
  "event withDrawal(address from, uint amount)",
  "event currentAccount(address account)",
]

const provider = new ethers.providers.Web3Provider(window.ethereum);

function Dapp({contracts}) {
    
  const [account, setAccount] = useState("Connect Wallet");
  const [accountBalance, setAccountBalance] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [contract, setContract] = useState()
  const [networkLabelHidden, setNetworkLabelHidden] = useState(true)
  const [withdrawNotificationVisible, setWithdrawNotificationVisible] = useState(false)
  const [unsupportedNetworkNotification, setUnsupportedNetworkNotification] = useState(false)
  const [withdrawErrorNotificationVisible, setWithdrawErrorNotificationVisible] = useState(false)
  const [comingSoonNetworkNotificationVisible, setComingSoonNetworkNotificationVisible] = useState(false)

  const [loading, setLoading] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState(0)
  const [withdrawnToken, setWithdrawnToken] = useState()
  const [receivedmMATICAmount, setReceivedmMATICAmount] = useState(0);
  const [receivedGoreliETHAmount, setReceivedGoreliETHAmount] = useState(0)
  const [sentmMATICAmount, setSentmMATICAmount] = useState(0);
  const [sentGoreliETHAmount, setSentGoreliETHAmount] = useState(0)
  const [ethToWithdraw, setEthToWithdraw] = useState(0);
  const [maticToWithdraw, setMaticToWithdraw] = useState(0);
  const [sentData, setSentData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [sentmMATICThisWeek, setSentmMATICThisWeek] = useState(0);
  const [sentGoreliETHThisWeek, setSentGoreliETHThisWeek] = useState(0)
  const [receivedmMATICThisWeek, setReceivedmMATICThisWeek] = useState(0)
  const [receivedGoreliETHThisWeek, setReceivedGoreliETHThisWeek] = useState(0);
  const [sentmMATICAllTime, setSentmMATICAllTime] = useState(0)
  const [sentGoreliETHAllTime, setSentGoreliETHAllTime] = useState(0)
  const [receivedmMATICAllTime, setReceivedmMATICAllTime] = useState(0)
  const [receivedGoreliETHAllTime, setReceivedGoreliETHAllTime] = useState(0);

  // const [ethWithdrawBtnVisible, setEthWithdrawBtnVisible] = useState(false);
  // const [maticWithdrawBtnVisible, setMaticWithdrawBtnVisible] = useState(false);
  const [allowedToSend, setAllowedToSend] = useState(false)
  const dropdownClickCounter = useRef(0)

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
    contracts[80001].on("withDrawal", (from, amt) => {
      console.log(`${amt} withdrawn successfully to the account ${from}`);
      Axios.post(process.env.REACT_APP_WITHDRAW_API , {
        recipient: from,
        token: "mMATIC"
      }).then((res) => {
        setWithdrawNotificationVisible(true)
        setTimeout(() => {
          setWithdrawNotificationVisible(false)
        }, 5000);
      })
    })
    return () => {
      contracts[80001].removeAllListeners("withDrawal");
    }

  }, [contracts])

  useEffect(() => {
    contracts[5].on("withDrawal", (from, amt) => {
      console.log(`${amt} withdrawn successfully to the account ${from}`);
      Axios.post(process.env.REACT_APP_WITHDRAW_API , {
        recipient: from,
        token: "GoreliETH"
      }).then((res) => {
        setWithdrawNotificationVisible(true)
        setTimeout(() => {
          setWithdrawNotificationVisible(false)
        }, 5000);
      })
    })
    return () => {
      contracts[5].removeAllListeners("withDrawal");
    }

  }, [contracts])

  useEffect(() => {
    setTimeout(() => {
      setNetworkLabelHidden(false)
    }, 500);
  }, [])

  window.onload = () => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        const currentChainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
      if(!supportedChainIds(currentChainId)) {
        setUnsupportedNetworkNotification(true)
        setTimeout(() => {
          setUnsupportedNetworkNotification(false)
        }, 5000);
      }
      if(currentChainId === "0x1" || currentChainId === "0x89") {
        setComingSoonNetworkNotificationVisible(true)
        setTimeout(() => {
          setComingSoonNetworkNotificationVisible(false)
        }, 5000);
      }
      }
    }
    checkNetwork()
  }

// const reloadP = () => {
//     sessionStorage.setItem("reloading", "true");
//     document.location.reload();
// }
// setting up the contract
  useEffect(() => {
    if(walletConnected) {
      if (window.ethereum) {
        if(isSupportedChain()) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddresses[window.ethereum.networkVersion], GiftCenterABI, signer);
          setContract(contract)
          setAllowedToSend(true)
        } 
      } 
    }
  }, [receivedmMATICAmount, walletConnected])


  useEffect(() => {
    const fetchAccountDetails = async (address) => {
        await Axios.post(process.env.REACT_APP_ACCOUNT_INFO_API, {
          address: address
        }).then((res) => {
          setSentData(res.data[0]);
          setReceivedData(res.data[1]);
          let totalmMATICSent = 0;
          let totalGoreliETHSent = 0;
          let totalmMATICReceived = 0;
          let totalGoreliETHReceived = 0;

          let totalmMATICGiftsSent = 0;
          let totalGoreliETHGiftsSent = 0;
          let totalmMATICGiftsReceived = 0;
          let totalGoreliETHGiftsReceived = 0;

          let totalETHToWithdraw = 0;
          let totalMATICToWithdraw = 0;

          res.data[0].forEach(element => {
            if(element.token ===  "GoreliETH") {
              totalGoreliETHGiftsSent += 1
              totalGoreliETHSent += element.amount;
            }
            else {
              totalmMATICSent += element.amount
              totalmMATICGiftsSent += 1
            }
          });

          res.data[1].forEach(element => {
            if(element.withdrawn === false) {
              if(element.token === "GoreliETH")
                totalETHToWithdraw += element.amount;
              else
                totalMATICToWithdraw += element.amount
            }
            if(element.token ===  "GoreliETH") {
              totalGoreliETHGiftsReceived += 1
              totalGoreliETHReceived += element.amount;
            }
            else {
              totalmMATICGiftsReceived += 1
              totalmMATICReceived += element.amount
            }
          });
          setLoading(false)
          
          
          setSentmMATICAmount(totalmMATICSent);
          setSentGoreliETHAmount(totalGoreliETHSent);
          setReceivedGoreliETHAmount(totalGoreliETHReceived);
          setReceivedmMATICAmount(totalmMATICReceived)

          setSentmMATICAllTime(totalmMATICGiftsSent)
          setSentGoreliETHAllTime(totalGoreliETHGiftsSent)
          setReceivedmMATICAllTime(totalmMATICGiftsReceived)
          setReceivedGoreliETHAllTime(totalGoreliETHGiftsReceived)
          
          setEthToWithdraw(totalETHToWithdraw)
          setMaticToWithdraw(totalMATICToWithdraw)

      })
    }

    if (account !== "Connect Wallet") {
        setLoading(true);
        fetchAccountDetails(ethers.utils.getAddress(account));
    }
  
  }, [account])

  useEffect(() => {
    if(walletConnected) {
      const getBalance = async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0]
        const accBalanace = parseFloat(ethers.utils.formatEther((await provider.getBalance(address))._hex)).toFixed(4);
        setAccountBalance(accBalanace);
      }
      try {
        getBalance()
      } catch(e){
          alert("Metamsk error while fetching balance refresh the page")
      }
    }
    
  }, [receivedData, walletConnected])
  
  // check if chain has been changed
  useEffect(() => {
    if(walletConnected) {
      if(window.ethereum) {
        window.ethereum.on("chainChanged", () => {
          document.location.reload(true)
        });
      }
      return () => {
        window.ethereum.removeAllListeners("chainChanged");
      } 
    }
  })

  // to sort gifts of latest week
  useEffect(() => {
    const todayDate = new Date();
    const sevenDaysBefore = moment(todayDate).subtract(7, 'days');
    let thisWeekSentmMATIC = 0;
    let thisWeekSentGoreliETH = 0;
    let thisWeekReceivedmMATIC = 0;
    let thisWeekReceivedGoreliETH = 0;
    for (let i = 0; i < sentData.length; i++) {
      if (moment(sentData[i].createdAt).isBetween(sevenDaysBefore, todayDate)){
        if(sentData[i].token === "GoreliETH")
          thisWeekSentGoreliETH += 1;
        else
          thisWeekSentmMATIC += 1
      }
    }
    for (let i = 0; i < receivedData.length; i++) {
      if (moment(receivedData[i].createdAt).isBetween(sevenDaysBefore, todayDate)){
        if(receivedData[i].token === "GoreliETH")
          thisWeekReceivedGoreliETH += 1;
        else
          thisWeekReceivedmMATIC += 1
      }
    }
    setSentmMATICThisWeek(thisWeekSentmMATIC);
    setSentGoreliETHThisWeek(thisWeekSentGoreliETH);
    setReceivedmMATICThisWeek(thisWeekReceivedmMATIC);
    setReceivedGoreliETHThisWeek(thisWeekReceivedGoreliETH)

  }, [sentData, receivedData])

  //function to withdraw goreli eth
  const withdrawETH = () => {
    if(ethToWithdraw > 0) {
      switchNetwork(5);
      const toWei = ethers.utils.parseUnits(ethToWithdraw.toString(), 18);
      try {
        contract.withdrawAmount(account, toWei);
        setWithdrawnToken("GoreliETH")
        setWithdrawnAmount(ethToWithdraw)
      } catch(err) {
        if (err.code === -32603)
          alert("Metamask Error. Please wait a bit and try again")
      }
      
    } else {
      setWithdrawErrorNotificationVisible(true)
      setTimeout(() => {
        setWithdrawErrorNotificationVisible(false)
      }, 5000);
    } 
  }

  //function to withdraw mumbai matic
  const withdrawMATIC = () => {
    if(maticToWithdraw > 0) {
      switchNetwork(80001)
      const toWei = ethers.utils.parseUnits(maticToWithdraw.toString(), 18);
      try {
        contract.withdrawAmount(account, toWei);
        setWithdrawnToken("mMATIC")
        setWithdrawnAmount(maticToWithdraw)
      } catch(err) {
        if (err.code === -32603)
          alert("Metamask Error. Please wait a bit and try again")
      }
    } else {
      setWithdrawErrorNotificationVisible(true)
      setTimeout(() => {
        setWithdrawErrorNotificationVisible(false)
      }, 5000);
    }
  }


  const connectToWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0]
      
      setWalletConnected(true);
      setLoading(true);

      window.localStorage.setItem('IS_WALLET_CONNECTED', JSON.stringify(true));
      window.localStorage.setItem('CURRENTLY_CONNECTED_WALLET', JSON.stringify(account));

      window.location.reload(true)
    } catch(error) {
      
    }
  }

  const connect = () => {
    if(!walletConnected) {
      if (window.ethereum) {
        connectToWallet();
      } else {
          alert("Install Metamask Extension");
      }
    } else {
        document.getElementsByClassName("modal")[0].style.display = "block";
    }
  }

  const disconnect = async () => {
    setWalletConnected(false);
    setAccount("Connect Wallet");

    window.localStorage.removeItem('IS_WALLET_CONNECTED');
    window.localStorage.removeItem('CURRENTLY_CONNECTED_WALLET');
  }

  const formatAmount = (amt) => {
    return amt.toFixed(4);
  }

  const formatAddress = (address) => {
      const checksumAddress = ethers.utils.getAddress(address)
      return checksumAddress
  }

  const isSupportedChain = () => {
    if(window.ethereum) {
      for (const key in chainSymbols) 
        if (key === window.ethereum.networkVersion) 
          return 1
      return 0
    }
  }

  const currentChainName = () => {
    if(window.ethereum) {
      for (const key in chainSymbols) {
        if (key === window.ethereum.networkVersion)
          return chainNames[key]
      }
      return "Switch Network"
    }
  }

  const supportedChainIds = (chainid) => {
    for (const key in hexChainIds) {
      if (hexChainIds[key] === chainid)
        return 1
    }
    return 0
  }

  const getNetworkLogo = () => {
    if(window.ethereum) {
      for (const key in networkLogosClass) {
        if (key === window.ethereum.networkVersion)
          return networkLogosClass[key]
      }
      return "alertlogo"
    }
    
  }
  
  const otherNetworks = () => {
    if(window.ethereum) {
      let nets = []
      for(const key in chainNames) {
        if(key !== window.ethereum.networkVersion)
          nets.push(key)
      }
      return nets
    }
  }


  const switchNetwork = async(network) => {
    if(window.ethereum.network !== network) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: hexChainIds[network] }], // chainId must be in hexadecimal numbers
        });
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: hexChainIds[network],
              params: [
                {
                  chainId: `0x${network.toString(16)}`,
                  rpcUrl: rpcURLs[network],
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
    }
    }
}

    return ( 
      <div>
        {walletConnected ?
          <div>
            <div className='notresponsive'><div className='noresponseinfo'>Please open in a Desktop or use Desktop mode...</div></div>
            <header className="dappheader">
                <div className="dappcontainer">
                    <div className="top">
                      <div className="sitenav">
                        <div className="logo"></div><div className="sitetitle">GiftCenter</div>
                      </div>
                        <div className="buttons">
                          { !networkLabelHidden ?
                          <div className="networksdropdown">
                            <button className={isSupportedChain() ? "networkdropbtn" : "networkerror"} onClick={() => {
                              if (dropdownClickCounter.current % 2 === 0) 
                                document.getElementsByClassName('dropdown-content')[0].style.display = "block";
                              else
                                document.getElementsByClassName('dropdown-content')[0].style.display = "none";
                              dropdownClickCounter.current += 1
                            }}>
                              <div className={getNetworkLogo()}></div>
                              {
                                currentChainName()
                              }
                              <i className='fa fa-angle-down'></i>
                            </button>
                            <div className="dropdown-content">
                              <div className="dropdownhead">Switch Network</div>
                              {
                                otherNetworks().map((network) => 
                                <button key={network} className="dropdown-content-btn-line" onClick={() => {
                                  switchNetwork(network)
                                }}>
                                  <div className={networkLogosClass[network]}></div>
                                  <div className="dropdown-content-label">{chainNames[network]}</div>
                                </button>
                                )
                              }
                            </div>
                          </div> : null
                          }
                          {
                            !networkLabelHidden ?
                            isSupportedChain() ?
                            <div className="accountdata">{accountBalance} {chainSymbols[window.ethereum.networkVersion]}</div> : null : null
                          }
                          <div><button className="connectbtn" onClick={connect}>{walletConnected ? <div className="address">{formatAddress(account).substring(0, 6)}<div className="addressdots">...</div>{formatAddress(account).substring(account.length -4, account.length)}</div> : null }</button></div>
                        </div>
                    </div>
                    <div className="details">
                      {
                        withdrawNotificationVisible ? <WithdrawNotification withdrawnAmount={withdrawnAmount} withdrawnToken={withdrawnToken}/> : null
                      }
                      {
                        unsupportedNetworkNotification ? <UnsupportedNetworkNotification /> : null
                      }
                      {
                        withdrawErrorNotificationVisible ? <WithdrawErrorNotification /> : null
                      }
                      {
                        comingSoonNetworkNotificationVisible ? <ComingSoonNetworkNotification /> : null
                      }
                        <div className="box">
                            <div className="boxtitle">Withdraw Amounts</div>
                            {loading ? <div className="loading">Loading...</div> :
                            <div>
                              <div className="dataline">
                                <div className="tokendata">
                                  <div className="tokenlabel">GoreliETH</div>
                                  <div className="tokenamount">{formatAmount(ethToWithdraw)}</div>
                                </div>
                                <div className="tokendata">
                                  <div className="tokenlabel">mMATIC</div>
                                  <div className="tokenamount">{formatAmount(maticToWithdraw)}</div>
                                </div>
                              </div>
                                <div className="withdrawbtnline">
                                  <button className="boxbtn" onClick={withdrawETH}>GoreliETH</button>
                                  <button className="boxbtn" onClick={withdrawMATIC}>mMATIC</button>
                                </div>
                            </div>
                            }
                        </div>
                        <div className="box">
                            <div className="boxtitle">Sent Gifts Data</div>
                            { loading ? <div className="loading">Loading...</div> :
                            <div>
                              <div className="dataline">
                                <div className="tokendata">
                                  <div className="tokenlabel">GoreliETH</div>
                                  <div className="tokenamount">{formatAmount(sentGoreliETHAmount)}</div>
                                </div>
                                <div className="tokendata">
                                  <div className="tokenlabel">mMATIC</div>
                                  <div className="tokenamount">{formatAmount(sentmMATICAmount)}</div>
                                  {/* <div className="tokenlabel">This Week: {sentmMATICThisWeek}</div>
                                  <div className="tokenlabel">All Time: {sentmMATICAllTime}</div> */}
                                </div>
                              </div>
                              <div className="giftcountdata">
                                <div className="giftcountdataline">
                                  <div className="giftcountdatablock">
                                    <div className="countdatalabel">This Week:</div>
                                    <div className="countdatavalue">{sentGoreliETHThisWeek}</div>
                                  </div>
                                  <div className="giftcountdatablock">
                                    <div className="countdatalabel">This Week:</div>
                                    <div className="countdatavalue">{sentmMATICThisWeek}</div>
                                  </div>
                                </div>
                                <div className="giftcountdataline">
                                  <div className="giftcountdatablock">
                                    <div className="countdatalabel">All Time:</div>
                                    <div className="countdatavalue">{sentGoreliETHAllTime}</div>
                                  </div>
                                  <div className="giftcountdatablock">
                                    <div className="countdatalabel">All Time:</div>
                                    <div className="countdatavalue">{sentmMATICAllTime}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            }
                        </div>
                        <div className="box">
                            <div className="boxtitle">Received Gifts Data</div>
                            { loading ? <div className="loading">Loading...</div> :
                            <div>
                              <div className="dataline">
                                <div className="tokendata">
                                  <div className="tokenlabel">GoreliETH</div>
                                  <div className="tokenamount">{formatAmount(receivedGoreliETHAmount)}</div>
                                </div>
                                <div className="tokendata">
                                  <div className="tokenlabel">mMATIC</div>
                                  <div className="tokenamount">{formatAmount(receivedmMATICAmount)}</div>
                                </div>
                              </div>
                              <div className="giftcountdata">
                                <div className="giftcountdataline">
                                  <div className="giftcountdatablock">
                                    <div className="countdatalabel">This Week:</div>
                                    <div className="countdatavalue">{receivedGoreliETHThisWeek}</div>
                                  </div>
                                  <div className="giftcountdatablock">
                                    <div className="countdatalabel">This Week:</div>
                                    <div className="countdatavalue">{receivedmMATICThisWeek}</div>
                                  </div>
                                </div>
                                <div className="giftcountdataline">
                                  <div className="giftcountdatablock">
                                    <div className="countdatalabel">All Time:</div>
                                    <div className="countdatavalue">{receivedGoreliETHAllTime}</div>
                                  </div>
                                  <div className="giftcountdatablock">
                                    <div className="countdatalabel">All Time:</div>
                                    <div className="countdatavalue">{receivedmMATICAllTime}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </header>
            <GiftsTables contract={contract} sentData={sentData} receivedData={receivedData} allowedToSend={allowedToSend}
                chainSymbols={chainSymbols} loading={loading}/>
            <div className="modal">
              <div className="modal-content">
                <div className="modalhead">
                  <div className="modalheading">Account</div>
                  <button className="modalcross" onClick={() => {
                    document.getElementsByClassName('modal')[0].style.display = "none";
                  }
                  }>&times;</button>
                </div>
                <div className="modalaccountdetails">
                  <div className="modaldetailhead">
                    <div className="modaldetailheading">Connected with Metamask</div>
                    <button className="smallbtn" onClick={disconnect}>Disconnect</button>
                  </div>
                  <div className="addressbar">{account.substring(0, 6)}...{account.substring(account.length -4, account.length)}</div>
                </div>
                
              </div>
            </div>
        </div>
        : <div>
        <header className="dappheader">
            <div className="dappcontainer">
                <div className="top">
                    <div className="sitenav">
                      <div className="logo"></div><div className="sitetitle">GiftCenter</div>
                    </div>
                    <div className="buttons">
                      <div><button className="connectbtn" onClick={connect}>{account}</button></div>
                      {walletConnected? 
                      <div><button className="connectbtn" onClick={disconnect}>Disconnect</button></div>: null
                      }
                    </div>
                </div>
                <div className="details">
                    <div className="box">
                      <div className="boxtitle">Withdraw Amounts</div>
                        <div className="data">...</div>
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