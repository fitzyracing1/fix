import { ethers } from "hardhat";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x08bfBEb9364510E15321068cd2B6391255f88D8c";
const AMOUNT = process.env.AMOUNT || "2000000"; // Default 2 million FCOIN

async function main() {
  const signers = await ethers.getSigners();
  if (signers.length === 0) {
    throw new Error("No signers available. Check PRIVATE_KEY in .env");
  }

  const deployer = signers[0];
  const address = await deployer.getAddress();

  console.log("\n=== Minting FireCoin ===");
  console.log("Contract:", CONTRACT_ADDRESS);
  console.log("Minting to:", address);
  console.log("Amount:", AMOUNT, "FCOIN");

  const FireCoin = await ethers.getContractAt("FireCoin", CONTRACT_ADDRESS);
  
  // Check current balance
  const beforeBalance = await FireCoin.balanceOf(address);
  const beforeBalanceFormatted = ethers.formatEther(beforeBalance);
  console.log("Balance before:", beforeBalanceFormatted, "FCOIN");

  // Mint tokens
  const amountWei = ethers.parseUnits(AMOUNT, 18);
  console.log("\nMinting...");
  const tx = await FireCoin.mint(address, amountWei);
  console.log("Transaction hash:", tx.hash);
  
  console.log("Waiting for confirmation...");
  await tx.wait();
  console.log("✅ Confirmed!");

  // Check new balance
  const afterBalance = await FireCoin.balanceOf(address);
  const afterBalanceFormatted = ethers.formatEther(afterBalance);
  console.log("\nBalance after:", afterBalanceFormatted, "FCOIN");
  console.log("Minted:", ethers.formatEther(afterBalance - beforeBalance), "FCOIN");
  console.log("===================\n");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
