require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/M2y-N2dpx1yQ1CHnLmfxlL5ThnajzQco',
      accounts: ['a525651d1afcc51f70873b085f106cc1d16383681de1620c782edb1abb0195bf']
    },
  },
  etherscan: {
    apiKey: 'M2y-N2dpx1yQ1CHnLmfxlL5ThnajzQco'
  }
};
