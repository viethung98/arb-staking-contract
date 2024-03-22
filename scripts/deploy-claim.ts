import { ethers } from "hardhat";

const BATCH_SIZE = 200;

async function main() {
  // We get the contract to deploy
  const Stake = await ethers.getContractFactory("Claim");
  const contract = await Stake.deploy();
  console.log("Claim deployed to:", contract.address);
  const token = "0x80680fDD7246DF76CD4c166769E8a38cD6684A50";
  await contract.setting(
    "0xe472306155b2004d9ee5f74c4f6187c0b5927080",
    token
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
