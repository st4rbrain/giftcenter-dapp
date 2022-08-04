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
  },
  etherscan: {
    apiKey: 'Q33YBDK4T9ME5V13WVTAEHKKECU7URU4GF'
  }
};
