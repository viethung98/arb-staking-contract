import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const Token = await ethers.getContractFactory("Token");
  const contract = await Token.deploy("USDT", "USDT");
  console.log("Token deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
