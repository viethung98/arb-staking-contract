import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const RKA = await ethers.getContractFactory("RKA");
  const contract = await RKA.deploy();
  console.log("Token deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
