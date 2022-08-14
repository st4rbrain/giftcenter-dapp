require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: "https://small-bold-dream.matic-testnet.discover.quiknode.pro/4e7c4314ce145b2aae49af69f438667ba35f897d/",
      accounts: ['a525651d1afcc51f70873b085f106cc1d16383681de1620c782edb1abb0195bf']
    },
    goreli: {
      url: "https://eth-goerli.g.alchemy.com/v2/wd2mv8Mb-R-zkfs5wLLG3og1RUHTaSTC",
      accounts: ['3667f018ba4985cd5f2eacd8d3d3a653e6301c3e6a67b0c9e811bbb4258c194c']
    },
  },
  etherscan: {
    apiKey: '8T2MZ1K7GRGY4R4YPXQ19M2HMZU9K7YVC7'
  },

};
