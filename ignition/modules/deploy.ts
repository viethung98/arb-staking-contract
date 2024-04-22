import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CoinModule = buildModule("CoinModule", (m: any) => {
  const RKA = m.contract("RKA");
  const Stake = m.contract("Stake")
  const Claim = m.contract("Claim")
  m.call(Stake, 'setting', [RKA])
  // m.call(USDCoin, "mint", [process.env.USDCOIN_MINTER || ""]);
  return { RKA };
});

export default CoinModule;
