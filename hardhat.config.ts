import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    arb: {
      url: process.env.ARB_URL || "",
      accounts:
        process.env.ARB_PRIVATE_KEY !== undefined
          ? [process.env.ARB_PRIVATE_KEY]
          : [],
      gasPrice: 1000000000,
      chainId: 42161,
    },
    arbtest: {
      url: process.env.ARB_URL || "",
      accounts:
        process.env.ARB_PRIVATE_KEY !== undefined
          ? [process.env.ARB_PRIVATE_KEY]
          : [],
      gasPrice: 1000000000,
      chainId: 421614,
    },
    local: {
      url: process.env.LOCAL_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARB_API_KEY || "",
      arbtest: process.env.ARB_API_KEY || "",
    },
    customChains: [
      {
        network: "arbtest",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/",
        },
      },
    ],
  },
};

export default config;
