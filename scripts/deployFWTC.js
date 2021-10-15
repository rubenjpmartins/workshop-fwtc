const hre = require("hardhat");

async function main() {
  const FWTCToken = await hre.ethers.getContractFactory("FWTCToken");
  const token = await FWTCToken.deploy(hre.ethers.utils.parseUnits("1000000"));

  await token.deployed();

  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
