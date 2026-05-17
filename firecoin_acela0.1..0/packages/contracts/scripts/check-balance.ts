import { ethers } from "hardhat";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";

async function main() {
  const signers = await ethers.getSigners();
  if (signers.length === 0) {
    throw new Error("No signers available. Check PRIVATE_KEY in .env");
  }

  const deployer = signers[0];
  const address = await deployer.getAddress();
  const balanceWei = await ethers.provider.getBalance(address);
  const balanceEth = ethers.formatEther(balanceWei);

  console.log("\n=== Balance Check ===");
  console.log("Network:", (await ethers.provider.getNetwork()).name, (await ethers.provider.getNetwork()).chainId);
  console.log("Address:", address);
  console.log("ETH Balance:", balanceEth, "ETH");

  if (CONTRACT_ADDRESS) {
    const FireCoin = await ethers.getContractAt("FireCoin", CONTRACT_ADDRESS);
    const fcoinBalance = await FireCoin.balanceOf(address);
    const fcoinFormatted = ethers.formatEther(fcoinBalance);
    const totalSupply = await FireCoin.totalSupply();
    const totalSupplyFormatted = ethers.formatEther(totalSupply);

    console.log("\n=== FireCoin Details ===");
    console.log("Contract:", CONTRACT_ADDRESS);
    console.log("Your FCOIN Balance:", fcoinFormatted, "FCOIN");
    console.log("Total Supply:", totalSupplyFormatted, "FCOIN");
    console.log("===================\n");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
