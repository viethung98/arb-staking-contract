import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CoinModule = buildModule("CoinModule", (m: any) => {
  const USDCoin = m.contract("Coin");
  // m.call(USDCoin, "mint", [process.env.USDCOIN_MINTER || ""]);
  return { USDCoin };
});

export default CoinModule;
