const hre = require("hardhat");

async function main() {

  const GiftCenter = await hre.ethers.getContractFactory("GiftCenter");
  const giftcenter = await GiftCenter.deploy();

  await giftcenter.deployed();

  console.log("GiftCenter deployed to:", giftcenter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
