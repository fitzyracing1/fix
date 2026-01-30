import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D";
  const signers = await ethers.getSigners();
  const deployer = signers[0];
  
  console.log("Minting with:", deployer.address);
  
  const fireCoin = await ethers.getContractAt("FireCoin", contractAddress);
  
  const amount = ethers.parseUnits("99000000", 18);
  console.log("Minting 99,000,000 FireCoin...");
  
  const tx = await fireCoin.mint(deployer.address, amount);
  console.log("Transaction hash:", tx.hash);
  
  await tx.wait();
  console.log("✅ Successfully minted 99,000,000 FireCoin!");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
