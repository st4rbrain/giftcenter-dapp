import { useEffect, useRef, useState } from "react";
import "./Dapp.css";
import GiftsTables from "../components/DappTables/DappTables";
import { WithdrawNotification, UnsupportedNetworkNotification } from "../components/notification";
import { WithdrawErrorNotification, ComingSoonNetworkNotification } from "../components/notification";
import jazzicon from "@metamask/jazzicon";
import {ethers} from 'ethers';
import Axios from "axios";
import moment from 'moment';

const contractAddresses = {
  80001: "0x44B78BdEE21810B87d78178Ba4DE299526e24127",
  5: "0xA83DC56a158C36C22c3A457EDe8396A289Cfca0c",
  137: "0x44B78BdEE21810B87d78178Ba4DE299526e24127",
  1: "0xA83DC56a158C36C22c3A457EDe8396A289Cfca0c"
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
  const avatarRef = useRef()
  const [walletConnected, setWalletConnected] = useState(false);
  const [contract, setContract] = useState()
  const [networkLabelHidden, setNetworkLabelHidden] = useState(true)
  const [withdrawNotificationVisible, setWithdrawNotificationVisible] = useState(false)
  const [unsupportedNetworkNotification, setUnsupportedNetworkNotification] = useState(false)
  const [withdrawErrorNotificationVisible, setWithdrawErrorNotificationVisible] = useState(false)
  const [comingSoonNetworkNotificationVisible, setComingSoonNetworkNotificationVisible] = useState(false)

  const [loading, setLoading] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [sentAmount, setSentAmount] = useState(0);
  const [ethToWithdraw, setEthToWithdraw] = useState(0);
  const [maticToWithdraw, setMaticToWithdraw] = useState(0);
  const [sentData, setSentData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [sentThisWeek, setSentThisWeek] = useState(0);
  const [receivedThisWeek, setReceivedThisWeek] = useState(0);

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
      Axios.post("http://localhost:3001/gifts/withdrawn", {
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
      Axios.post("http://localhost:3001/gifts/withdrawn", {
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
    if (window.ethereum) {
        if(isSupportedChain()) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddresses[window.ethereum.networkVersion], GiftCenterABI, signer);
          setContract(contract)
          setAllowedToSend(true)
        } 
      } 
  }, [receivedAmount])


  useEffect(() => {
    const fetchAccountDetails = async (address) => {
        await Axios.post('http://localhost:3001/gifts/accountInfo/', {
          address: address
        }).then((res) => {
          setSentData(res.data[0]);
          setReceivedData(res.data[1]);
          let totalAmountSent = 0;
          let totalAmountReceived = 0;
          let totalETHToWithdraw = 0;
          let totalMATICToWithdraw = 0;

          res.data[0].forEach(element => {
            totalAmountSent += element.amount;
          });
          res.data[1].forEach(element => {
            if(element.withdrawn === false) {
              if(element.token === "GoreliETH")
                totalETHToWithdraw += element.amount;
              else
                totalMATICToWithdraw += element.amount
            }
            totalAmountReceived += element.amount;
          });
          setTimeout(() => {
            setLoading(false);
            // if (totalETHToWithdraw > 0) 
            //   setEthWithdrawBtnVisible(true);
            // if(totalMATICToWithdraw > 0)
            //   setMaticWithdrawBtnVisible(true);
          }, 500);
          
          
          setReceivedAmount(totalAmountReceived);
          setSentAmount(totalAmountSent);
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
    const getBalance = async () => {
      if(account !== "Connect Wallet") {
        const accBalanace = parseFloat(ethers.utils.formatEther((await provider.getBalance(account))._hex)).toFixed(4);
        setAccountBalance(accBalanace);
      }
    }
    getBalance()
    
  }, [account])

  const getAvatar = () => {
    const element = avatarRef.current;
    if (element && account !== "Connect Wallet") {
        const addr = account.slice(2, 10);
        const seed = parseInt(addr, 16);
        const icon = jazzicon(20, seed); //generates a size 20 icon
        if (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        element.appendChild(icon);
    }
  }

  useEffect(() => {
    getAvatar()
});
  
  // check if chain has been changed
  useEffect(() => {
    if(window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        document.location.reload(true)
      });
    }
    return () => {
      window.ethereum.removeAllListeners("chainChanged");
    } 
  })

  // to sort gifts of latest week
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

  //function to withdraw goreli eth
  const withdrawETH = () => {
    if(ethToWithdraw > 0) {
      switchNetwork(5);
      const toWei = ethers.utils.parseUnits(ethToWithdraw.toString(), 18);
      try {
        contract.withdrawAmount(account, toWei);
      } catch(err) {
        if (err.code === 32000)
          alert("Please wait a bit and try again")
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
      } catch(err) {
        if (err.code === 32000)
          alert("Please wait a bit and try again")
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
      const check_add = ethers.utils.getAddress(account);

      setAccount(account);
      getAvatar();
      console.log("Connected to account", check_add);
      const accBalanace = parseFloat(ethers.utils.formatEther((await provider.getBalance(account))._hex)).toFixed(4);
      setAccountBalance(accBalanace);

      setWalletConnected(true);
      setLoading(true);

      window.localStorage.setItem('IS_WALLET_CONNECTED', JSON.stringify(true));
      window.localStorage.setItem('CURRENTLY_CONNECTED_WALLET', JSON.stringify(account));
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
            <header className="dappheader">
                <div className="dappcontainer">
                    <div className="top">
                        <div className="logo">GiftCenter</div>
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
                          <div><button className="connectbtn" onClick={connect}>{walletConnected ? <div className="address"><div className="identicon" ref={avatarRef}></div>{ethers.utils.getAddress(account).substring(0, 6)}<div className="addressdots">...</div>{ethers.utils.getAddress(account).substring(account.length -4, account.length)}</div> : {account} }</button></div>
                        </div>
                    </div>
                    <div className="details">
                      {
                        withdrawNotificationVisible ? <WithdrawNotification /> : null
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
            <GiftsTables contract={contract} sentData={sentData} receivedData={receivedData} allowedToSend={allowedToSend} account={ethers.utils.getAddress(account)} chainSymbols={chainSymbols} />
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