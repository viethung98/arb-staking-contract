import { ethers } from "hardhat";

const BATCH_SIZE = 200;

async function main() {
  // We get the contract to deploy
  const Stake = await ethers.getContractFactory("Claim");
  const contract = await Stake.deploy();
  console.log("Claim deployed to:", contract.address);
  const token = "0x3cEC5C4c0374D4cC7d086299234ffFe542F5dd11";
  await contract.setting(
    token,
    "0xe472306155b2004d9eE5F74c4F6187C0b5927080",
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
