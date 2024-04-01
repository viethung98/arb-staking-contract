import { BigNumber } from "ethers";

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VerifySignature", function () {
  it("Check signature", async function () {
    const accounts = await ethers.getSigners(2);
    const Token = await ethers.getContractFactory("Token");
    const tokenContract = await Token.deploy("USDT", "USDT");
    await tokenContract.deployed();
    const VerifySignature = await ethers.getContractFactory("Claim");
    const contract = await VerifySignature.deploy();
    await contract.deployed();
    await contract.setting(tokenContract.address, accounts[0].address);
    await tokenContract.approve(contract.address, 1000);
    await contract.deposit(1000);
    // const PRIV_KEY = "0x..."
    // const signer = new ethers.Wallet(PRIV_KEY)
    const signer = accounts[0];
    const txId = "65543d672e866d03e18fbca2";
    const to = accounts[1].address;
    const amount = 999;
    const message = "Hello";

    const hash = await contract.getMessageHash(txId, to, amount, message);
    const sig = await signer.signMessage(ethers.utils.arrayify(hash));

    const ethHash = await contract.getEthSignedMessageHash(hash);

    console.log("signer          ", signer.address);
    console.log("recovered signer", await contract.recoverSigner(ethHash, sig));

    // Correct signature and message returns true
    expect(
      await contract.verify(signer.address, txId, to, amount, message, sig)
    ).to.equal(true);

    await contract.claimReward(txId, to, amount, message, sig);
    console.log(await tokenContract.balanceOf(to));
  });
});
