import { ethers } from "hardhat";

const BATCH_SIZE = 200;

async function main() {
  // We get the contract to deploy
  const Stake = await ethers.getContractFactory("Stake");
  const contract = await Stake.deploy();
  console.log("Stake deployed to:", contract.address);
  const token = "0x80680fDD7246DF76CD4c166769E8a38cD6684A50";
  await contract.setting(token);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
