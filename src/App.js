import { useState, useEffect } from 'react';
import './App.css';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';

function App() {

  const { authenticate, isAuthenticated, isAuthenticating, logout } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const [senderAddress, setSenderAddress] = useState();

  useEffect(() => {
    if(isAuthenticated){
      document.getElementById('showadd').value = senderAddress;
    }else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);


  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({signingMessage: "Log in using Moralis" })
        .then((user) => {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
          setSenderAddress(user.get('ethAddress'));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  const gift = async () => {
    let options = {
      contractAddress: "0x7D2D054b8A80a21F0404B60d019868a5b257A028",
      functionName: "sendGift",
      abi: [
        {
          "inputs":[
            {
              "internalType":"address",
              "name":"_recipient",
              "type":"address"
            },
            {
              "internalType":"string",
              "name":"_message",
              "type":"string"
            }
          ],
          "name":"sendGift",
          "outputs":[],
          "stateMutability":"payable",
          "type":"function"
        }
      ],
      params: {
        _recipient: document.getElementById('address').value,
        _message: document.getElementById('msg').value,
      },
      amount: 5000000000000000000,
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Gift sent successfully!");
      },
      onError: (error) => {
        alert(error.data.msg);
      }
    });
  }

  return (
    <div>
      <input type="button" className="loginbtn" onClick={login} value="Connect Wallet" id="showadd"></input>
      <input type='button' className="logoutbtn"onClick={logOut} disabled={isAuthenticating} value="Disconnect"></input>
      <div className='outerbox'>
        <div className="App">
          <p className="heading">GiftCenter</p>
          <div>
            <p className='subhead'>A place to show some love to your friends and family through the blockchain technology</p>
          </div>
          <div className='datafield'>
            <div className='label'>Recipient Address:</div> 
            <input className='addinput' type="text" id='address'></input>
            <div className='label'>Message:</div>
            <textarea id='msg' className='msginput' rows="6" cols="65"></textarea>
            <div className='label'>Amount:</div>
            <div><input className='amtinput' type="text" id='amt'></input></div>
            <button className='giftbtn' onClick={() => {
              if(isAuthenticated){
                gift();
              }else{
                alert("Connect your Wallet");
              }
            }}>Send Gift</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
