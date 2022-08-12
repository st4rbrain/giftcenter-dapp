import Home from "./pages/Home";
import Dapp from "./pages/Dapp";
import {ethers} from 'ethers';
import { Route, Routes} from 'react-router-dom';

const GiftCenterABI = [
  "function sendGift(address _recipient, string memory _message) public payable",
  "function setAccount(address _account) external",
  "event currentAccount(address account)",
  "event Gifted(uint count, address from, address to, string message, uint amount, uint time)",
  "event withDrawal(address from, uint amount)"
];


const contractAddresses = {
  80001: "0x44B78BdEE21810B87d78178Ba4DE299526e24127",
  5: "0xA83DC56a158C36C22c3A457EDe8396A289Cfca0c",
}

const rpcURLs = {
  80001: "https://polygon-mumbai.g.alchemy.com/v2/M2y-N2dpx1yQ1CHnLmfxlL5ThnajzQco",
  5: "https://eth-goerli.g.alchemy.com/v2/wd2mv8Mb-R-zkfs5wLLG3og1RUHTaSTC",
  137: "https://polygon-mainnet.g.alchemy.com/v2/S9MJYwIo4fqMvKl-9bgBAGIKpMWRKGwo",
  1: "https://eth-mainnet.g.alchemy.com/v2/U7DDkqUi09q7epTmJ4cz93KtkMfZO2mg"
}

const contracts = {

}

for (const key in contractAddresses) {
  const provider = new ethers.providers.JsonRpcProvider(rpcURLs[key])
  const contract = new ethers.Contract(contractAddresses[key], GiftCenterABI, provider)
  contracts[key] = contract
}


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home contracts={contracts}/>}></Route>
        <Route path="/dapp" element={<Dapp contracts={contracts} />}></Route>
      </Routes>
    </>
  );
}

export default App;
