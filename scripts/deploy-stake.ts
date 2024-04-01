import { ethers } from "hardhat";

const BATCH_SIZE = 200;

async function main() {
  // We get the contract to deploy
  const Stake = await ethers.getContractFactory("Stake");
  const contract = await Stake.deploy();
  console.log("Stake deployed to:", contract.address);
  const token = "0x3cec5c4c0374d4cc7d086299234fffe542f5dd11";
  await contract.setting(token);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
