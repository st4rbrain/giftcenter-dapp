const hre = require("hardhat");

async function main() {

  const Gift = await hre.ethers.getContractFactory("Gift");
  const gift = await Gift.deploy();

  await gift.deployed();

  console.log("Gift deployed to:", gift.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
